const { api, utils } = require('dext-core-utils');
const { fork } = require('child_process');
const deepAssign = require('deep-assign');
const electron = require('electron');
const fs = require('fs');
const is = require('is_js');
const MarkdownIt = require('markdown-it');
const path = require('path');
const plist = require('plist');
const { MAX_RESULTS, IS_DEV } = require('../../constants');

const { app } = electron;
const { PLUGIN_PATH } = utils.paths;

const resolveByCondition = (condition, Right, Left) =>
  condition ? Right() : Left();
const resolvePath = (directoryPath, file) => path.resolve(directoryPath, file);

// This is added to pave way for mocking and testability
// eslint-disable-next-line global-require, import/no-dynamic-require
const requireBy = pkg => require(pkg);

/**
 * Loads plugins in the given path
 *
 * // TODO: break into smaller method. this method has too much responsibilities
 * @param {Object} directory - A plugin directory object to read { path, isCore }
 * @return {Promise} - An array of plugin paths
 */
exports.loadPluginsInPath = directory =>
  new Promise(resolve => {
    const extractPluginPaths = plugins =>
      plugins
        .filter(plugin => plugin && plugin !== '.DS_Store')
        .map(plugin => resolvePath(directory.path, plugin));

    resolveByCondition(
      directory.isCore,
      () => {
        fs.readdir(directory.path, (err, plugins) => {
          if (err || [null, undefined, ''].includes(plugins)) {
            reject(err);
            return;
          }
          resolve(extractPluginPaths(plugins));
        });
      },
      () => {
        resolve(extractPluginPaths(api.plugins.getAll()));
      }
    );
  });

/**
 * Checks to see if a plugin is a core plugin.
 * (Lives inside the core plugin path)
 *
 * @param
 */
exports.isCorePlugin = directory => {
  const dirname = path.dirname(directory);
  return dirname !== PLUGIN_PATH;
};

/**
 * Checks if the plugin is a theme
 *
 * @param {String} directory - A plugin directory
 * @return {Boolean} - True if it is a theme
 */
exports.isPluginATheme = directory => {
  try {
    const pkg = requireBy(resolvePath(directory, 'package.json'));
    // TODO: change the mechanism?
    // don't load themes by checking if dext-theme is non-existent in keywords
    return !pkg.keywords || pkg.keywords.indexOf('dext-theme') > -1;
  } catch (err) {
    return false;
  }
};

/**
 * Applies the module properties by loading them.
 * Loads the plugin's Alfred plist file if available.
 * Modifies the schema property if the plugin is an Alfred plugin.
 *
 * plugin { path, name, isCore, schema, keyword, action, helper }
 *
 * @param {String} plugin - The plugin object
 * @return {Promise} - A modified clone of the plugin object
 */
exports.applyModuleProperties = plugin =>
  new Promise(resolve => {
    const plistPath = resolvePath(plugin.path, 'info.plist');
    fs.access(plistPath, fs.constants.R_OK, err1 => {
      if (err1) {
        // retrieve the keyword and action from the plugin
        const { keyword, action, helper } = requireBy(plugin.path);
        // set the plugin object overrides
        resolve(
          deepAssign({}, plugin, {
            schema: 'dext',
            action,
            keyword,
            helper,
          })
        );
      } else {
        // read, parses, and map the plist file options to
        // the dext plugin object schema
        fs.readFile(plistPath, 'utf8', (err2, data) => {
          if (err2) {
            resolve(plugin);
          } else {
            const plistData = plist.parse(data);
            let keyword = '';
            let action = '';
            plistData.objects.forEach(o => {
              if (o.type === 'alfred.workflow.input.scriptfilter') {
                keyword = o.config.keyword;
              } else if (o.type === 'alfred.workflow.action.openurl') {
                action = 'openurl';
              }
            });
            // set the plugin object overrides
            const newOpts = {
              schema: 'alfred',
              action,
              keyword,
            };
            resolve(deepAssign({}, plugin, newOpts));
          }
        });
      }
    });
  });

/**
 * Loads all enabled plugins from the given set of
 * directories and apply module properties.
 *
 * @param {Object[]} directories - An array of directory objects to load { path, isCore }
 * @return {Promise} - Resolves a list of plugin objects
 */
exports.loadPlugins = directories =>
  new Promise((resolve, reject) => {
    const loadedPlugins = directories.map(exports.loadPluginsInPath);
    Promise.all(loadedPlugins).then(pluginSets => {
      const allPlugins = pluginSets
        .reduce((a, b) => a.concat(b), [])
        .map(plugin => ({
          path: plugin,
          name: path.basename(plugin),
          isCore: exports.isCorePlugin(plugin),
          schema: 'dext',
          action: 'openurl',
          keyword: '',
        }))
        .filter(plugin => !exports.isPluginATheme(plugin.path));
      // check for Alfred plugins in the user
      // if it is an Alfred plugin, set the schema
      const ready = allPlugins.map(exports.applyModuleProperties);
      Promise.all(ready)
        .then(resolve)
        .catch(reject);
    });
  });

/**
 * Retrieve the native file icon as a base64 encoded string
 *
 * @param {String} fileIconPath - The file path
 * @return {Promise<String>} - A base64 string representation of the file icon image
 */
exports.getFileIcon = fileIconPath =>
  new Promise((resolve, reject) => {
    app.getFileIcon(fileIconPath, (err, icon) => {
      if (err) {
        reject(err);
        return;
      }
      if (!icon) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('');
        return;
      }
      resolve(icon.toDataURL());
    });
  });

/**
 * Connects the item sets with the given plugin
 *
 * plugin { path, name, isCore, schema, keyword, action, helper }
 *
 * @param {Object[]} items - An array of items
 * @param {Object} plugin - The plugin object data
 * @return {Object}
 */
exports.connectItems = (items, plugin) =>
  items.map(i => {
    const icon = {
      type: i && i.icon && i.icon.type,
      path: '',
    };
    if (i.icon && i.icon.path) {
      icon.path = i.icon.path;
      const isBase64 = /data:image\/.*;base64/.test(i.icon.path);
      if (!is.url(i.icon.path) && !isBase64) {
        icon.path = path.resolve(plugin.path, i.icon.path);
      }
    }
    // if an icon isn't set, fallback to the icon.png file in the plugin's directory
    if (!icon.path) {
      icon.path = path.resolve(plugin.path, 'icon.png');
    }
    const newObject = deepAssign({}, i);
    newObject.plugin = {
      path: plugin.path,
      name: plugin.name,
    };
    if (plugin.keyword) {
      newObject.keyword = plugin.keyword;
    }
    if (plugin.action) {
      newObject.action = plugin.action;
    }
    if (icon.path) {
      if (!newObject.icon) {
        newObject.icon = {};
      }
      newObject.icon.path = icon.path;
    }
    return newObject;
  });

/**
 * Queries for the items in the given plugin
 *
 * plugin { path, name, isCore, schema, keyword, action, helper }
 *
 * @param {Object} plugin - The plugin object
 * @param {String[]} args - An array of arguments
 * @return {Promise} - An array of results
 */
exports.queryResults = (plugin, args) =>
  new Promise(resolve => {
    const query = args.join(' ');
    switch (plugin.schema) {
      case 'alfred': {
        // fork a child process to receive all stdout
        // and concat it to the results array
        const options = {
          cwd: plugin.path,
          silent: true,
        };
        const child = fork(plugin.path, args, options);
        let msg = '';
        child.stdout.on('data', data => {
          if (data) {
            msg += data.toString();
          }
        });
        child.on('exit', () => {
          let items = [];
          if (msg.length) {
            const output = JSON.parse(msg);
            if (output) {
              items = exports.connectItems(output.items, plugin);
            }
          }
          resolve(items);
        });
        break;
      }
      default: {
        // eslint-disable-line no-fallthrough
        // eslint-disable-next-line global-require, import/no-dynamic-require
        const pluginObj = require(plugin.path);

        // The new API:
        // - `query`: querying the plugin with arguments
        // - `execute`: executing the specific item
        const isOutdatedPlugin = Boolean(pluginObj && pluginObj.execute);
        const queryCommand = isOutdatedPlugin ? 'execute' : 'query';
        const command = pluginObj[queryCommand];
        const output =
          typeof command === 'function'
            ? command(query, { size: MAX_RESULTS })
            : command;

        if (output) {
          if (IS_DEV && isOutdatedPlugin) {
            // eslint-disable-next-line no-console
            console.log(`
            Plugin is outdated.
            Please update the plugin accordingly to the new API.
            @see https://github.com/DextApp/dext/issues/52 for reference.
          `);
          }

          // @TODO
          // consider whether we should support plugins to throw their own `Error`
          Promise.resolve(output).then(i => {
            const items = exports.connectItems(i.items, plugin);
            resolve(items);
          });
        } else {
          resolve([]);
        }
        break;
      }
    }
  });

/**
 * Retrieve helper items
 *
 * plugin { path, name, isCore, schema, keyword, action, helper }
 *
 * @param {Object} plugin - The plugin object
 * @param {String[]} keyword - The query keyword
 * @return {Promise} - An array of results
 */
exports.queryHelper = (plugin, keyword) =>
  new Promise(resolve => {
    let items = [];
    if (!plugin.helper) {
      resolve(items);
      return;
    }
    let helperItem = plugin.helper;
    // retrieve the helper item call if it's
    // a function and resolve as necessary
    if (typeof plugin.helper === 'function') {
      helperItem = plugin.helper(keyword);
    }

    Promise.resolve(helperItem).then(item => {
      // allows multiple helper items, keeping backwards compatibility.
      if (Array.isArray(item)) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < item.length; i++) {
          items.push(item[i]);
        }
      } else {
        items.push(item);
      }

      items = exports.connectItems(items, plugin);
      resolve(items);
    });
  });

/**
 * Retrieve the item's details
 *
 * plugin { path, name, isCore, schema, keyword, action, helper }
 *
 * @cached
 * @param {Object} item
 * @param {Object} plugin - The plugin object
 * @return {Promise} - Resolves to the rendered html string
 */
exports.retrieveItemDetails = (item, plugin) =>
  new Promise((resolve, reject) => {
    // retrieve the rendered content
    if (!plugin || !plugin.details) {
      reject(new Error(`Missing details for ${plugin.name}`));
      return;
    }
    const type = plugin.details.type || 'html';
    const content = resolveByCondition(
      Boolean(plugin.details.render),
      () =>
        typeof plugin.details.render === 'function'
          ? plugin.details.render(item)
          : plugin.details.render,
      () => ''
    );
    switch (type) {
      case 'md': {
        const mdRenderer = new MarkdownIt();
        resolve(mdRenderer.render(content));
        break;
      }
      case 'html':
        resolve(content);
        break;
      default:
        reject(
          new Error(`Invalid \`type\` given on plugin renderer ${plugin.name}`)
        );
    }
  });
