const path = require('path');
const { spawn } = require('child_process');
const rimraf = require('rimraf');
const npmName = require('npm-name');
const {
  ERR_MODULE_NOT_FOUND,
  ERR_MODULE_INSTALLED,
  ERR_MODULE_NOT_INSTALLED,
  ERR_THEME_ALREADY_ACTIVE,
} = require('./errors');
const Conf = require('../utils/conf');
const { downloadPackage } = require('../utils/download');
const { PLUGIN_PATH } = require('../utils/paths');

const config = new Conf();

/**
 * Checks if it exists on npm
 *
 * @param {String} plugin - The name of the plugin
 * @return {Promise}
 */
const checkOnNpm = plugin => new Promise(resolve => {
  npmName(plugin).then(available => {
    if (available) {
      throw new Error(ERR_MODULE_NOT_FOUND);
    }
    resolve();
  });
});

/**
 * Installs a plugin
 *
 * @param {String} plugin - The name of the plugin
 * @return {Promise}
 */
const install = plugin => new Promise(resolve => {
  const plugins = config.get('plugins') || [];

  if (plugins.indexOf(plugin) > -1) {
    throw new Error(ERR_MODULE_INSTALLED);
  }

  checkOnNpm(plugin).then(() => {
    // download, install, and update configs
    downloadPackage(plugin).then(outputDir => {
      const installProcess = spawn('npm', ['install', '--prefix', outputDir]);
      installProcess.on('close', (code) => {
        if (!code) {
          plugins.push(plugin);
          config.set('plugins', plugins);
          resolve();
        }
      });
    });
  });
});

/**
 * Uninstalls a plugin
 *
 * @param {String} plugin - The name of the plugin
 * @return {Promise}
 */
const uninstall = plugin => new Promise(resolve => {
  const plugins = config.get('plugins') || [];

  if (!plugins || !plugins.length) {
    throw new Error(ERR_MODULE_NOT_INSTALLED);
  }

  if (plugins.indexOf(plugin) === -1) {
    throw new Error(ERR_MODULE_NOT_INSTALLED);
  }

  // removes the directory
  const pluginDir = path.resolve(PLUGIN_PATH, plugin);
  rimraf(pluginDir, err => {
    if (err) {
      throw new Error(err);
    }
    plugins.splice(plugins.indexOf(plugin), 1);
    config.set('plugins', plugins);
    resolve();
  });
});

/**
 * Switches your current theme
 *
 * @param {String} theme - The name of the theme
 * @return {Promise}
 */
const setTheme = theme => new Promise(resolve => {
  const currentTheme = config.get('theme');
  const plugins = config.get('plugins') || [];

  if (currentTheme === theme) {
    throw new Error(ERR_THEME_ALREADY_ACTIVE);
  }

  if (!plugins || !plugins.length) {
    throw new Error(ERR_MODULE_NOT_INSTALLED);
  }

  if (plugins.indexOf(theme) === -1) {
    throw new Error(ERR_MODULE_NOT_INSTALLED);
  }

  config.set('theme', theme);

  resolve();
});

module.exports = {
  checkOnNpm,
  install,
  uninstall,
  setTheme,
};
