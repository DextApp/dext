const path = require('path');
const fs = require('fs');
const os = require('os');
const url = require('url');
require('string_score');

/**
 * Retrieve the Chrome user directory
 *
 * @return {String}
 */
const getChromePath = () => path.resolve(os.homedir(), 'Library', 'Application Support', 'Google', 'Chrome');

/**
 * Retrieve the default profile
 *
 * @return {String}
 */
const getDefaultProfile = () => path.resolve(getChromePath(), 'Default');

/*
 * Recursively returns an array of bookmark url objects
 *
 * @param {Object[]} children
 * @return {Object[]}
 */
const getBookmarkChildren = children => {
  // build the bookmarks list
  let bookmarks = [];
  children.forEach(child => {
    if (child.type === 'folder') {
      const grandChildren = getBookmarkChildren(child.children);
      bookmarks = bookmarks.concat(grandChildren);
    } else {
      bookmarks.push(child);
    }
  });
  return bookmarks;
};

/**
 * Reads the file and extract the bookmarks
 *
 * @param {String} file
 * @return {Promise} - An array of bookmark objects
 */
const extractBookmarks = file => new Promise(resolve => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      resolve([]);
    } else {
      const dataJson = JSON.parse(data);
      if (dataJson.roots) {
        // build the bookmarks list
        let bookmarks = [];
        Object.keys(dataJson.roots).forEach(folder => {
          const rootObject = dataJson.roots[folder];
          const children = rootObject.children ? getBookmarkChildren(rootObject.children) : [];
          if (children.length) {
            bookmarks = bookmarks.concat(children);
          }
        });
        resolve(bookmarks);
      } else {
        resolve([]);
      }
    }
  });
});

const getFavicon = link => {
  const o = url.parse(link);
  if (o) {
    const hostname = o.hostname;
    return `http://${hostname}/favicon.ico`;
  }
  return '';
};

/**
 * Converts the bookmark data objects to dext item
 *
 * @param {Object[]} - An array of bookmark objects
 * @return {Object[]} - An array of dext items
 */
const toItems = bookmarks => (
  bookmarks
    .map(i => ({
      title: i.name,
      subtitle: i.url,
      arg: i.url,
      icon: {
        path: getFavicon(i.url),
      },
    }))
);

module.exports = {
  action: 'openurl',
  output: q => new Promise(resolve => {
    const defaultProfilePath = getDefaultProfile();
    fs.readdir(defaultProfilePath, (err, files) => {
      if (!err) {
        const bookmarks = files.filter(f => f === 'Bookmarks');
        if (bookmarks.length) {
          const file = path.resolve(defaultProfilePath, bookmarks[0]);
          extractBookmarks(file).then(data => {
            const items = toItems(data);
            // score each item
            items.forEach(i => {
              // eslint-disable-next-line no-param-reassign
              i.score = i.title.score(q);
            });
            const sortedItems = items
              // filter out 0's
              .filter(i => i.score > 0)
              // sort by score
              .sort((a, b) => {
                const scoreA = a.title.score(q);
                const scoreB = b.title.score(q);
                if (scoreA === scoreB) {
                  return 0;
                } else if (scoreA < scoreB) {
                  return 1;
                }
                return -1;
              })
              .filter((a, b) => b < 20);
            resolve({ items: sortedItems || [] });
          });
        } else {
          resolve({ items: [] });
        }
      } else {
        resolve({ items: [] });
      }
    });
  }),
};
