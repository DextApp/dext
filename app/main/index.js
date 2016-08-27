const path = require('path');
const electron = require('electron');
const { loadPlist, loadPlugins, queryResults } = require('./plugins');
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
  IPC_EXECUTE_ITEM,
  IPC_LOAD_THEME,
} = require('../ipc');
const Config = require('../../utils/conf');
const { PLUGIN_PATH } = require('../../utils/paths');

const { app, BrowserWindow, globalShortcut, ipcMain, shell } = electron;

// set default window values
const WINDOW_DEFAULT_WIDTH = 650;
const WINDOW_DEFAULT_HEIGHT = 80;
const WINDOW_MIN_HEIGHT = 80;
const WINDOW_MAX_HEIGHT = 650;
const MAX_RESULTS = 10;

let win = null;

// create a user config
const config = new Config();

// toggles the main window visibility
const toggleMainWindow = () => {
  if (win.isVisible()) {
    win.hide();
  } else {
    win.show();
  }
};

const selectPreviousItem = () => {
  win.webContents.send(IPC_SELECT_PREVIOUS_ITEM);
};

const selectNextItem = () => {
  win.webContents.send(IPC_SELECT_NEXT_ITEM);
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
  win.webContents.send(IPC_WINDOW_SHOW);
};

const handleWindowHide = () => {
  globalShortcut.unregister('up');
  globalShortcut.unregister('down');
  win.webContents.send(IPC_WINDOW_HIDE);
};

const handleWindowBlur = () => {
  win.hide();
};

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
  });
};

/**
 * Creates a new Browser window and loads the renderer index
 */
const createWindow = () => {
  win = new BrowserWindow({
    width: WINDOW_DEFAULT_WIDTH,
    height: WINDOW_DEFAULT_HEIGHT,
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

  /**
   * Registers plugin query listeners
   *
   * @param {Object} keywordMap - An object representing the keyword and action configurations
   */
  const registerIpcListeners = keywordMap => {
    // listen to query commands and queries for results
    // and sends it to the renderer
    ipcMain.on(IPC_QUERY_COMMAND, (evt, message) => {
      const args = message.q.split(' ');
      const keyword = args.shift();
      const filteredPlugins = Object.keys(keywordMap)
        // filter through the keyword map for those matching keywords
        .filter(k => k.toLowerCase() === keyword.toLowerCase())
        // lists of plugins for each keyword
        .map(k => keywordMap[k])
        // flatten lists
        .reduce((prev, next) => prev.concat(next), []);
      if (args && args.length && args[0].length) {
        // search through all those filtered plugins with the specified keyword
        // then query it for results
        const resultsPromises = filteredPlugins
          .map(p => queryResults(p, args));
        // resolve all promises then merge the results
        Promise.all(resultsPromises)
          .then(resultSet => {
            if (resultSet && resultSet.length) {
              const results = resultSet
                // flatten and merge items
                .reduce((prev, next) => prev.concat(next))
                // filter max results
                .slice(0, MAX_RESULTS);
              // send the results back to the renderer
              evt.sender.send(IPC_QUERY_RESULTS, results);
            } else {
              // send the results back to the renderer
              evt.sender.send(IPC_QUERY_RESULTS, []);
            }
          })
          .catch(err => {
            console.error(err); // eslint-disable-line no-console
          });
      } else {
        // send the results back to the renderer
        evt.sender.send(IPC_QUERY_RESULTS, []);
      }
    });

    // listen for execution commands
    ipcMain.on(IPC_EXECUTE_ITEM, (evt, message) => {
      switch (message.action) {
        case 'openurl':
          shell.openExternal(message.item.arg);
          break;
        default:
          // do nothing
          break;
      }
    });
  };

  // loads the plugins
  loadPlugins(PLUGIN_PATH).then(plugins => {
    // load the plist for each plugins
    const plists = plugins.map(p => loadPlist(p));
    // wait for all to be loaded
    Promise.all(plists).then(resultSets => {
      const keywordMap = {};
      // store all return results into the keywordMap object
      resultSets.forEach(result => {
        if (result) {
          if (typeof keywordMap[result.keyword] === 'undefined') {
            keywordMap[result.keyword] = [];
          }
          keywordMap[result.keyword].push(result);
        }
      });
      registerIpcListeners(keywordMap);
    });
  });

  // DEBUG
  if (process.env.NODE_ENV === 'development') {
    win.openDevTools();
  }
};

app.on('ready', createWindow);
