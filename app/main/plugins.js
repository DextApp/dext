const path = require('path');
const fs = require('fs');
const { fork } = require('child_process');
const plist = require('plist');
const deepAssign = require('deep-assign');

/**
 * Loads all plugins in the given path
 *
 * @param {String} directory - The plugins directory
 * @return {Promise} - An array of plugins
 */
exports.loadPlugins = directory => new Promise(resolve => {
  const loaded = [];
  fs.readdir(directory, (err, plugins) => {
    if (plugins && plugins.length) {
      plugins.forEach(plugin => {
        const pluginPath = path.resolve(directory, plugin);
        // TODO: change the mechanism?
        // don't load themes by checking if dext-theme is non-existent in keywords
        const pkg = require(path.resolve(pluginPath, 'package.json')); // eslint-disable-line global-require
        if (!pkg.keywords || pkg.keywords.indexOf('dext-theme') === -1) {
          loaded.push(pluginPath);
        }
      });
    }
    resolve(loaded);
  });
});


/**
 * Loads the plugin's Alfred plist file if available
 *
 * @param {String} plugin - The path to the plugin
 * @return {Promise} - An object with the script filter's data (eg: { schema, plugin, keyword, action })
 */
exports.loadPlist = plugin => new Promise(resolve => {
  const plistPath = path.resolve(plugin, 'info.plist');
  fs.access(plistPath, fs.constants.R_OK, err1 => {
    if (err1) {
      // if no plist is available, just resolve the module
      const { keyword, action } = require(plugin); // eslint-disable-line global-require
      const schema = 'dext';
      resolve({ schema, plugin, keyword, action });
    } else {
      // read the plist file
      fs.readFile(plistPath, 'utf8', (err2, data) => {
        const retval = { schema: 'alfred', plugin };
        if (!err2) {
          const obj = plist.parse(data);
          // extract the script filter's keyword if available
          const scriptFilter = obj.objects.filter(o => o.type === 'alfred.workflow.input.scriptfilter').shift();
          if (scriptFilter) {
            retval.keyword = scriptFilter.config.keyword;
          }
          // extract the script filter's keyword if available
          const openUrlAction = obj.objects.filter(o => o.type === 'alfred.workflow.action.openurl').shift();
          if (openUrlAction) {
            retval.action = 'openurl';
          }
          resolve(retval);
        } else {
          resolve(false);
        }
      });
    }
  });
});

/**
 * Connects the item sets with the given plugin
 *
 * @param {Object[]} - An array of items
 * @param {Object} - The plugin object data { schema, plugin, action, keyword }
 */
exports.connectItems = (items, plugin) => items.map(i => deepAssign({}, i, {
  keyword: plugin.keyword,
  action: plugin.action,
}));
/**
 * Queries for the items in the given plugin
 *
 * @param {Object} - The plugin object data { schema, plugin, action, keyword }
 * @param {String[]} - An array of arguments
 * @return {Promise} - An array of results
 */
exports.queryResults = (plugin, args) => new Promise(resolve => {
  // process based on the schema
  switch (plugin.schema) {
    case 'alfred': {
      // fork a child process to receive all stdout
      // and concat it to the results array
      const options = {
        silent: true,
      };
      const child = fork(plugin.plugin, args, options);
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
    case 'dext':
      // no break
    default: { // eslint-disable-line no-fallthrough
      const m = require(plugin.plugin); // eslint-disable-line global-require
      let output = '';
      if (typeof m.output === 'function') {
        output = m.output(args.join(' '));
      } else {
        output = m.output;
      }
      let items = [];
      if (output) {
        Promise.resolve(output).then(a => {
          items = exports.connectItems(a.items, plugin);
          resolve(items);
        });
      }
      break;
    }
  }
});
