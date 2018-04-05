const path = require('path');
const { utils } = require('dext-core-utils');

const { THEME_PATH } = utils.paths;

/**
 * Loads a specified theme
 *
 * @param {String} theme - The name of the theme
 * @return {Promise} - The theme module
 */
exports.loadTheme = theme =>
  new Promise(resolve => {
    if (theme) {
      const p = path.resolve(THEME_PATH, theme);
      try {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        const m = require(p);
        resolve(m);
      } catch (err) {
        resolve(false);
      }
    } else {
      resolve(false);
    }
  });
