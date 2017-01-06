const path = require('path');
const osApps = require('os-apps');
const macIcons = require('mac-icons');

/**
 * Returns true if the path matches the query
 *
 * @param {String} query
 * @param {String} filePath
 * @return {Boolean} Returns true if matched
 */
const isMatched = (query, filePath) => new RegExp(query.toLowerCase(), 'i').test(filePath);

/**
 * Converts an application path to an item
 *
 * @param {String} filePath
 * @return {Promise} - Resolves to a Dext item schema
 */
const toItem = (filePath) => new Promise(resolve => {
  const fileName = path.basename(filePath, path.extname(filePath));

  if (process.platform === 'darwin') {
    macIcons.getIcon(filePath)
      .then(iconStr => {
        resolve({
          title: fileName,
          subtitle: filePath,
          arg: filePath,
          icon: {
            path: iconStr,
          },
        });
      });
  } else {
      resolve({
        title: fileName,
        subtitle: filePath,
        arg: filePath,
        icon: {
          type: 'text',
          letter: fileName.substr(0, 1).toUpperCase(),
        },
      });
  }
});

module.exports = {
  action: 'open',
  query: (query) => new Promise(resolve => {
    const items = [];
    if (!query) {
      resolve({ items });
      return;
    }

    osApps.getAll()
      .then(apps => {
        const itemPromises = [];
        for (let i = 0; i < apps.length; i++) {
          if (isMatched(query, apps[i])) {
            itemPromises.push(toItem(apps[i]));
          }
        }

        Promise.all(itemPromises)
          .then(itemsResolved => resolve({ items: itemsResolved }));
      });
  }),
};
