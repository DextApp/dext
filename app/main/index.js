require('string_score');
const path = require('path');
const { spawn } = require('child_process');
const electron = require('electron');
const {
  loadPlugins,
  queryResults,
  queryHelper,
  retrieveItemDetails,
} = require('./plugins');
const { loadTheme } = require('./themes');
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
} = require('../ipc');
const { MAX_RESULTS } = require('../constants');
const Config = require('../../utils/conf');
const CacheConf = require('../../utils/CacheConf');
const { debounce } = require('../../utils/helpers');
const { CORE_PLUGIN_PATH, PLUGIN_PATH } = require('../../utils/paths');

const { app, BrowserWindow, clipboard, globalShortcut, ipcMain, shell } = electron;

// set default window values
const WINDOW_DEFAULT_WIDTH = 700;
const WINDOW_DEFAULT_HEIGHT = 80;
const WINDOW_MIN_HEIGHT = 80;
const WINDOW_MAX_HEIGHT = 710; // results + query + padding

let win = null;

// create a user config
const config = new Config();

const hideWindow = () => win && win.hide();

// toggles the main window visibility
const toggleMainWindow = () => {
  if (win.isVisible()) {
    hideWindow();
  } else {
    win.show();
  }
};

const execute = message => {
  switch (message.action) {
    case 'openurl':
      if (message.item.arg) {
        shell.openExternal(message.item.arg);
      }
      break;
    case 'exec':
      if (message.item.arg) {
        spawn('node', [message.item.arg], { cwd: message.item.plugin.path });
      }
      break;
    default:
      // do nothing
      break;
  }
};

const selectPreviousItem = () => {
  win.webContents.send(IPC_SELECT_PREVIOUS_ITEM);
};

const selectNextItem = () => {
  win.webContents.send(IPC_SELECT_NEXT_ITEM);
};

const executeCurrentItem = () => {
  win.webContents.send(IPC_EXECUTE_CURRENT_ITEM);
};

const copyItem = () => {
  win.webContents.send(IPC_COPY_CURRENT_ITEM_KEY);
};

const repositionWindow = () => {
  const { screen } = electron;
  const cursorPoint = screen.getCursorScreenPoint();
  const currScreen = screen.getDisplayNearestPoint(cursorPoint);
  const resultsHeight = WINDOW_MAX_HEIGHT;
  const size = win.getSize();
  const winPosition = [
    ((currScreen.size.width / 2) - (size[0] / 2)) + currScreen.bounds.x,
    ((currScreen.size.height / 2) - ((size[1] + resultsHeight) / 2)) + currScreen.bounds.y,
  ];
  win.setPosition(winPosition[0], winPosition[1]);
};

// free the window object from memory
const handleWindowClose = () => {
  win = null;
};

const handleWindowShow = () => {
  globalShortcut.register('up', selectPreviousItem);
  globalShortcut.register('down', selectNextItem);
  globalShortcut.register('enter', executeCurrentItem);
  globalShortcut.register('escape', hideWindow);
  globalShortcut.register('cmd+c', copyItem);
  win.webContents.send(IPC_WINDOW_SHOW);
};

const handleWindowHide = () => {
  globalShortcut.unregister('up');
  globalShortcut.unregister('down');
  globalShortcut.unregister('enter');
  globalShortcut.unregister('escape');
  globalShortcut.unregister('cmd+c');
  win.webContents.send(IPC_WINDOW_HIDE);
};

const handleWindowBlur = hideWindow;

const handleWindowResize = (evt, { width, height }) => {
  // re-size
  const size = win.getContentSize();
  const newWidth = width || size[0];
  const newHeight = (WINDOW_MIN_HEIGHT + height) || size[1];
  win.setContentSize(newWidth, newHeight);
};

const handleWindowCollapse = () => {
  const size = win.getContentSize();
  win.setContentSize(size[0], WINDOW_MIN_HEIGHT);
};

/**
 * Loads the theme when the finish has finished loading
 */
const handleDidFinishLoad = () => {
  const t = config.get('theme') || '';
  loadTheme(t).then(theme => {
    if (theme) {
      win.webContents.send(IPC_LOAD_THEME, theme);
    }
    // initial window display
    win.show();
  });
};

/**
 * Makes a query to all plugins.
 *
 * plugins { path, name, isCore, schema, action, keyword }
 *
 * @param {Event} evt
 * @param {Object} message - The IPC message { q, type }
 * @param {Object[]} plugins - An array of plugin objects
 */
const handleQueryCommand = (evt, { q: queryPhrase }, plugins) => {
  const results = []; // the end result of promises
  const fractions = queryPhrase.split(' ');
  const [keyword, ...args] = fractions;
  const queryString = args.join(' ').trim();

  const matchedPlugins = plugins.filter(p => keyword === p.keyword);

  // if plugins are found with the current keyword
  // only make queries to those plugins
  if (matchedPlugins.length) {
    matchedPlugins.forEach(plugin => {
      // query helper only if the query string isn't set
      if (!queryString.length) {
        results.push(queryHelper(plugin, keyword));
      }
      // query results if it's a core plugin or has a query string
      if (plugin.isCore || queryString.length) {
        results.push(queryResults(plugin, args));
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
        return Boolean(score)
          ? score > 0.25
          : true; // return by default if there is no score in the first place.
      })
      // filter max results
      .slice(0, MAX_RESULTS);

    // send the results back to the renderer
    evt.sender.send(IPC_QUERY_RESULTS, retval || []);
  });
};

/**
 * Retrieve item details and sends back the response.
 * Loads from cache if necessary.
 *
 * @param {Event} evt
 * @param {Object} item
 */
const handleItemDetailsRequest = (evt, item) => {
  // set empty content
  let content = '';
  // load from cache if available
  const configName = `${path.basename(item.plugin.path)}-itemDetails`;
  const cacheConf = new CacheConf({ configName });
  const cacheKey = JSON.stringify(item);
  if (cacheConf.has(cacheKey)) {
    content = cacheConf.get(cacheKey);
  } else {
    // otherwise, load from plugin
    const plugin = require(item.plugin.path); // eslint-disable-line global-require
    content = retrieveItemDetails(item, plugin);
    cacheConf.set(cacheKey, content);
  }
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
  let content = item.arg;
  if (item.text && item.text.copy) {
    content = item.text.copy;
  }
  clipboard.writeText(content);
};

/**
 * Create a debounced function for handling the query command
 */
const debounceHandleQueryCommand = debounce(handleQueryCommand, 500);

const debounceHandleItemDetailsRequest = debounce(handleItemDetailsRequest, 500);

const debounceHandleCopyItemToClipboard = debounce(handleCopyItemToClipboard, 500);

/**
 * Creates a new Browser window and loads the renderer index
 */
const createWindow = () => {
  win = new BrowserWindow({
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
  });

  // re-position
  repositionWindow();

  const rendererPath = path.resolve(__dirname, '..', 'renderer');
  const indexPath = `file://${rendererPath}/index.html`;

  win.loadURL(indexPath);

  win.on('closed', handleWindowClose);
  win.on('show', handleWindowShow);
  win.on('hide', handleWindowHide);
  win.on('blur', handleWindowBlur);
  win.webContents.on('did-finish-load', handleDidFinishLoad);

  // expand and collapse window based on the results
  ipcMain.on(IPC_WINDOW_RESIZE, handleWindowResize);
  ipcMain.on(IPC_WINDOW_COLLAPSE, handleWindowCollapse);

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
    ipcMain.on(IPC_QUERY_COMMAND, (evt, message) => debounceHandleQueryCommand(evt, message, plugins));
    // listen for execution commands
    ipcMain.on(IPC_EXECUTE_ITEM, (evt, message) => {
      execute(message);
    });
    // listen for item details requests
    ipcMain.on(IPC_ITEM_DETAILS_REQUEST, (evt, item) => debounceHandleItemDetailsRequest(evt, item));
    // copies to clipboard
    ipcMain.on(IPC_COPY_CURRENT_ITEM, (evt, item) => debounceHandleCopyItemToClipboard(evt, item));
  };

  // load all plugins (core and user) and
  // then registers the ipc listeners
  loadPlugins([CORE_PLUGIN_PATH, PLUGIN_PATH]).then(registerIpcListeners);
};

app.on('ready', createWindow);
