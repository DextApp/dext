const path = require('path');
const osApps = require('os-apps');

/**
 * Returns true if the path matches the query
 *
 * @param {String} query
 * @param {String} filePath
 * @return {Boolean} Returns true if matched
 */
const isMatched = (query, filePath) => {
  const patt = new RegExp(query.toLowerCase(), 'i');
  return patt.test(filePath);
};

/**
 * Converts an application path to an item
 *
 * @param {String} filePath
 * @return {Object}
 */
const toItem = (filePath) => {
  const fileName = path.basename(filePath, path.extname(filePath));
  return {
    title: fileName,
    subtitle: filePath,
    arg: filePath,
    icon: {
      type: 'text',
      letter: fileName.substr(0, 1).toUpperCase(),
    },
  };
};

module.exports = {
  action: 'open',
  query: (query) => new Promise(resolve => {
    let items = [];
    if (!query) {
      resolve({ items });
      return;
    }

    osApps.getAll()
      .then(apps => {
        const matches = apps
         .filter(a => isMatched(query, a))
         .map(toItem);
        items = items.concat(matches);
        resolve({ items });
      });
  }),
};
