const path = require('path');
const electron = require('electron');
const {
  loadPlugins,
  queryResults,
  connectItems,
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
  IPC_EXECUTE_CURRENT_ITEM,
  IPC_EXECUTE_ITEM,
  IPC_LOAD_THEME,
} = require('../ipc');
const Config = require('../../utils/conf');
const { debounce } = require('../../utils/helpers');

const { app, BrowserWindow, globalShortcut, ipcMain, shell } = electron;

// set default window values
const WINDOW_DEFAULT_WIDTH = 650;
const WINDOW_DEFAULT_HEIGHT = 80;
const WINDOW_MIN_HEIGHT = 80;
const WINDOW_MAX_HEIGHT = 680; // results + query
const MAX_RESULTS = 20;

let win = null;

// create a user config
const config = new Config();

const hideWindow = () => (
  win && win.hide()
);

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
  win.webContents.send(IPC_WINDOW_SHOW);
};

const handleWindowHide = () => {
  globalShortcut.unregister('up');
  globalShortcut.unregister('down');
  globalShortcut.unregister('enter');
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
const handleQueryCommand = (evt, message, plugins) => {
  let args = message.q.split(' ');
  const kw = args.shift().toLowerCase();
  // collect results
  const results = [];
  // find if it matches the current keyword
  const matchedPlugins = plugins.filter(p => kw.length && kw === p.keyword.toLowerCase());
  // if plugins are found with the current keyword
  // only make queries to those plugins
  if (matchedPlugins && matchedPlugins.length) {
    // if no args are set, display the keyword helper
    if (!args.length || !args[0].trim().length) {
      // retrieve the helper item
      // call if it's a function
      // and resolve as necessary
      const helper = matchedPlugins[0].helper;
      let helperItem = helper;
      if (typeof helper === 'function') {
        helperItem = helper(kw);
      }
      Promise.resolve(helperItem).then(item => {
        // send a result for the current filtered keyword
        evt.sender.send(IPC_QUERY_RESULTS, connectItems([item], matchedPlugins[0]));
      });
    } else {
      matchedPlugins.forEach(plugin => {
        results.push(queryResults(plugin, args));
      });
    }
  } else {
    // otherwise, do a regular query
    plugins.forEach(plugin => {
      // make sure to reset the args array for each plugin
      args = message.q.split(' ');
      // if core, then just apply the output method
      if (plugin.isCore) {
        results.push(queryResults(plugin, args));
      } else {
        // extract the keyword
        const keyword = args.shift();
        // if the keyword exists and query matches the plugin's keyword
        if (keyword && plugin.keyword.toLowerCase() === keyword.toLowerCase()) {
          results.push(queryResults(plugin, args));
        }
      }
    });
  }
  Promise.all(results).then(resultSet => {
    const retval = resultSet
      // flatten and merge items
      .reduce((prev, next) => prev.concat(next))
      // filter max results
      .slice(0, MAX_RESULTS);
    // send the results back to the renderer
    evt.sender.send(IPC_QUERY_RESULTS, retval || []);
  });
};

/**
 * Create a debounced function for handling the query command
 */
const debounceHandleQueryCommand = debounce(handleQueryCommand, 500);

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
  globalShortcut.register('cmd+space', toggleMainWindow);
  globalShortcut.register('escape', hideWindow);

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
  };

  // load all plugins and then
  // registers the ipc listeners
  loadPlugins().then(plugins => {
    registerIpcListeners(plugins);
  });
};

app.on('ready', createWindow);
