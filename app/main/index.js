require('string_score');
const path = require('path');
const electron = require('electron');
const { utils } = require('dext-core-utils');
const {
  loadPlugins,
  queryResults,
  queryHelper,
  retrieveItemDetails,
  getFileIcon,
} = require('./plugins');
const { loadTheme } = require('./themes');
const actions = require('./actions');
const {
  IPC_WINDOW_SHOW,
  IPC_WINDOW_HIDE,
  IPC_WINDOW_RESIZE,
  IPC_WINDOW_COLLAPSE,
  IPC_QUERY_COMMAND,
  IPC_QUERY_RESULTS,
  IPC_SELECT_PREVIOUS_ITEM,
  IPC_SELECT_NEXT_ITEM,
  IPC_COPY_CURRENT_ITEM,
  IPC_COPY_CURRENT_ITEM_KEY,
  IPC_EXECUTE_CURRENT_ITEM,
  IPC_EXECUTE_ITEM,
  IPC_ITEM_DETAILS_REQUEST,
  IPC_ITEM_DETAILS_RESPONSE,
  IPC_LOAD_THEME,
  IPC_FETCH_ICON,
  IPC_RETRIEVE_ICON,
} = require('../ipc');
const {
  MAX_RESULTS,
  CORE_PLUGIN_PATH,
  DEBOUNCE_TIME,
  IS_DEV,
} = require('../constants');
const Config = require('./utils/conf');
const { debounce, hasOwnProp, getOwnProp } = require('./utils/helpers');

const { PLUGIN_PATH } = utils.paths;
const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  nativeImage,
  clipboard,
  globalShortcut,
  ipcMain,
} = electron;

// set default window values
// @TODO, move out
const WINDOW_DEFAULT_WIDTH = 700;
const WINDOW_DEFAULT_HEIGHT = 80;
const WINDOW_MIN_HEIGHT = 80;
const WINDOW_MAX_HEIGHT = 710; // results + query + padding

let win = null;
let tray = null;

// create a user config
const config = new Config();
const hideWindow = () => win && win.hide();

/**
 * Repositions the window based on the mouse's active screen
 */
const repositionWindow = () => {
  const { screen } = electron;
  const cursorPoint = screen.getCursorScreenPoint();
  const currScreen = screen.getDisplayNearestPoint(cursorPoint);
  const resultsHeight = WINDOW_MAX_HEIGHT;
  const size = win.getSize();

  // @TODO: Move this into a testable utility.
  const winPosition = [
    Math.floor(currScreen.size.width / 2 - size[0] / 2) + currScreen.bounds.x,
    Math.floor(currScreen.size.height / 2 - (size[1] + resultsHeight) / 2) +
      currScreen.bounds.y,
  ];

  win.setPosition(winPosition[0], winPosition[1]);
};

/**
 * Toggles the main window visibility
 */
const toggleMainWindow = () => {
  repositionWindow();
  if (win.isVisible()) hideWindow();
  else win.show();
};

/**
 * Executes an action for a given message based on modifier priority.
 *
 * Priority: SuperKey, AltKey, None
 *
 * @param {Object} message
 * @TODO: move out
 */
const execute = message => {
  // apply modifiers if necessary
  const arg =
    (message.isSuperMod && getOwnProp(message, 'item.mods.cmd.arg')) ||
    (message.isAltMod && getOwnProp(message, 'item.mods.alt.arg')) ||
    message.item.arg;

  if (hasOwnProp(actions, message.action)) {
    const actionMod = actions[message.action];
    actionMod.apply(null, [message, arg]);
  }
};

const handleWindowResize = (evt, { width, height }) => {
  const [windowWidth, windowHeight] = win.getContentSize();
  const nextWidth = width || windowWidth;
  const nextHeight = WINDOW_MIN_HEIGHT + height || windowHeight;
  win.setContentSize(nextWidth, nextHeight);
};

/**
 * Loads the theme when the finish has finished loading
 *
 * @param {Object} theme
 */
const handleDidFinishLoad = theme => {
  if (theme) {
    win.webContents.send(IPC_LOAD_THEME, theme);
  }
  // initial window display
  win.show();
};

/**
 * Makes a query to all plugins.
 *
 * plugins { path, name, isCore, schema, action, keyword }
 *
 * @param {Event} evt
 * @param {Object} message - The IPC message { q }
 * @param {Object[]} plugins - An array of plugin objects
 */
const handleQueryCommand = (evt, { q: queryPhrase }, plugins) => {
  const results = []; // the end result of promises
  const fractions = queryPhrase.split(' ');

  // @TODO: read a matcher API from plugins
  const [keyword, ...args] = fractions;
  const queryString = args.join(' ').trim();

  const matchedPlugins = plugins.filter(
    p => !p.keyword || keyword === p.keyword
  );

  // if plugins are found with the current keyword
  // only make queries to those plugins
  if (matchedPlugins.length) {
    matchedPlugins.forEach(plugin => {
      let display = 'results';
      // determine if we should display helper or query items?
      if (plugin.isCore && (!plugin.keyword || keyword === plugin.keyword)) {
        display = 'results';
      } else if (plugin.keyword && !queryString.length) {
        display = 'helper';
      }
      switch (display) {
        case 'helper':
          results.push(queryHelper(plugin, keyword));
          break;
        case 'results':
          if (!plugin.keyword) {
            results.push(queryResults(plugin, fractions));
          } else {
            results.push(queryResults(plugin, args));
          }
          break;
        default:
          // do nothing
          break;
      }
    });
  } else {
    // otherwise, do a regular query to core plugins
    plugins.forEach(plugin => {
      // if core, then query the results
      if (plugin.isCore && (!plugin.keyword || keyword === plugin.keyword)) {
        results.push(queryResults(plugin, fractions));
      }
    });
  }

  Promise.all(results).then(resultSet => {
    const retval = resultSet
      // flatten and merge items
      .reduce((prev, next) => prev.concat(next))
      // sort by score
      .sort((a, b) => {
        const scoreA = a.title.toLowerCase().score(keyword);
        const scoreB = b.title.toLowerCase().score(keyword);
        if (scoreA === scoreB) {
          return 0;
        } else if (scoreA < scoreB) {
          return 1;
        }
        return -1;
      })
      .filter(i => {
        const score = i.title.toLowerCase().score(keyword);
        // eslint-disable-next-line no-extra-boolean-cast
        return Boolean(score) ? score > 0.25 : true; // return by default if there is no score in the first place.
      })
      // filter max results
      .slice(0, MAX_RESULTS);

    // send the results back to the renderer
    evt.sender.send(IPC_QUERY_RESULTS, retval || []);
  });
};

/**
 * Retrieve item details and sends back the response.
 *
 * @param {Event} evt
 * @param {Object} item
 */
const handleItemDetailsRequest = (evt, item) => {
  // otherwise, load from plugin
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const plugin = require(item.plugin.path);
  // @todo - cache content
  const content = retrieveItemDetails(item, plugin);
  // resolve and update the state
  Promise.resolve(content).then(html => {
    evt.sender.send(IPC_ITEM_DETAILS_RESPONSE, html);
  });
};

/**
 * Copies the item data to the clipboard
 *
 * @param {Event} evt
 * @param {Object} item
 */
const handleCopyItemToClipboard = (evt, item) => {
  clipboard.writeText(item.text && item.text.copy ? item.text.copy : item.arg);
};

/**
 * Create a debounced function for handling the query command
 */
const debounceHandleQueryCommand = debounce(handleQueryCommand, DEBOUNCE_TIME);

const debounceHandleItemDetailsRequest = debounce(
  handleItemDetailsRequest,
  DEBOUNCE_TIME
);

const debounceHandleCopyItemToClipboard = debounce(
  handleCopyItemToClipboard,
  DEBOUNCE_TIME
);

/**
 * Creates a new Browser window and loads the renderer index.
 *
 * @param {Object} theme
 * @return {BrowserWindow}
 */
const createWindow = theme => {
  const opts = {
    width: WINDOW_DEFAULT_WIDTH,
    height: WINDOW_DEFAULT_HEIGHT,
    maxHeight: WINDOW_MAX_HEIGHT,
    center: false,
    frame: false,
    show: false,
    minimizable: false,
    maximizable: false,
    hasShadow: true,
    skipTaskbar: true,
    transparent: true,
  };

  // sets the background color
  if (theme && theme.window.backgroundColor) {
    opts.backgroundColor = theme.window.backgroundColor;
  }

  return new BrowserWindow(opts);
};

// create the Context Menu for the Tray
const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Toggle Dext',
    type: 'normal',
    click: () => {
      toggleMainWindow();
    },
  },
  { type: 'separator' },
  {
    label: 'Quit',
    type: 'normal',
    click: () => {
      app.quit();
    },
  },
]);

/**
 * When the app is ready, creates the window,
 * register hotkeys, and loading plugins
 */
const onAppReady = () => {
  // loads the tray
  tray = new Tray(
    nativeImage.createFromPath(
      path.resolve(__dirname, '..', '..', 'resources', 'icon.png')
    )
  );

  tray.setContextMenu(contextMenu);

  // loads the theme
  const t = config.get('theme') || '';
  loadTheme(t)
    .then(theme => {
      win = createWindow(theme);

      repositionWindow();

      const rendererPath = path.resolve(__dirname, '..', 'renderer');
      const indexPath = `file://${rendererPath}/index.html`;

      win.loadURL(indexPath);
      win.on('closed', () => {
        win = null;
      });
      win.on('show', () => {
        const executeCurrentItem = () => {
          win.webContents.send(IPC_EXECUTE_CURRENT_ITEM);
        };
        globalShortcut.register('escape', hideWindow);

        globalShortcut.register('up', () => {
          win.webContents.send(IPC_SELECT_PREVIOUS_ITEM);
        });
        globalShortcut.register('down', () => {
          win.webContents.send(IPC_SELECT_NEXT_ITEM);
        });
        globalShortcut.register('enter', executeCurrentItem);
        globalShortcut.register('alt+enter', executeCurrentItem);
        globalShortcut.register('super+enter', executeCurrentItem);
        globalShortcut.register('cmd+c', () => {
          win.webContents.send(IPC_COPY_CURRENT_ITEM_KEY);
        });
        win.webContents.send(IPC_WINDOW_SHOW);
      });

      win.on('hide', () => {
        globalShortcut.unregister('up');
        globalShortcut.unregister('down');
        globalShortcut.unregister('enter');
        globalShortcut.unregister('alt+enter');
        globalShortcut.unregister('super+enter');
        globalShortcut.unregister('escape');
        globalShortcut.unregister('cmd+c');
        win.webContents.send(IPC_WINDOW_HIDE);
      });
      win.on('blur', hideWindow);
      win.webContents.on('did-finish-load', handleDidFinishLoad);

      // expand and collapse window based on the results
      ipcMain.on(IPC_WINDOW_RESIZE, handleWindowResize);
      ipcMain.on(IPC_WINDOW_COLLAPSE, () => {
        const [nextWidth] = win.getContentSize();
        win.setContentSize(nextWidth, WINDOW_MIN_HEIGHT);
      });

      // register global shortcuts
      globalShortcut.register(config.get('hotKey'), toggleMainWindow);

      /**
       * Registers the query command listeners for all plugins
       *
       * { path, name, isCore, schema, action, keyword }
       *
       * @param {Object[]} plugins - An array of plugin objects
       */
      const registerIpcListeners = plugins => {
        // listen to query commands and queries
        // for results and sends it to the renderer
        ipcMain.on(IPC_QUERY_COMMAND, (evt, message) =>
          debounceHandleQueryCommand(evt, message, plugins)
        );

        // listen for execution commands
        ipcMain.on(IPC_EXECUTE_ITEM, (evt, message) => {
          execute(message);
        });

        // listen for item details requests
        ipcMain.on(IPC_ITEM_DETAILS_REQUEST, (evt, item) =>
          debounceHandleItemDetailsRequest(evt, item)
        );

        // copies to clipboard
        ipcMain.on(IPC_COPY_CURRENT_ITEM, (evt, item) =>
          debounceHandleCopyItemToClipboard(evt, item)
        );

        // fetches the file icon
        ipcMain.on(IPC_FETCH_ICON, (evt, item) => {
          getFileIcon(item).then(fileIconPath => {
            evt.sender.send(IPC_RETRIEVE_ICON, fileIconPath);
          });
        });
      };

      // load all plugins (core and user) and
      // then registers the ipc listeners
      return loadPlugins([
        { path: CORE_PLUGIN_PATH, isCore: true },
        { path: PLUGIN_PATH, isCore: false },
      ])
        .then(registerIpcListeners)
        .then(() => win);
    })
    .then(registeredWindow => {
      if (IS_DEV) registeredWindow.webContents.openDevTools({ detach: true });
    });
};

app.dock.hide();
app.on('ready', onAppReady);
