require('string_score');

const browserBookmarks = require('browser-bookmarks');

/**
 * Converts the bookmark object to Dext item
 *
 * @param {Object} item - The bookmark object
 * @return {Object} - The Dext bookmark object
 */
const mapDextItem = item => ({
  title: item.title,
  subtitle: `(${item.folder || 'misc'}) - ${item.url}`,
  arg: item.url,
  icon: {
    path: item.favicon,
  },
});

/**
 * Sort function comparing 2 items by score
 */
const sortByScore = (a, b) => {
  if (a.score === b.score) {
    return 0;
  } else if (a.score < b.score) {
    return 1;
  }
  return -1;
};

module.exports = {
  action: 'openurl',
  query: (query, options = { size: 20 }) =>
    new Promise(resolve => {
      const { size } = options;
      browserBookmarks.getChrome().then(bookmarks => {
        // resolve and exist if there's no bookmarks
        if (!bookmarks.length) {
          resolve({ items: [] });
          return;
        }

        const items = new Array(bookmarks.length);

        for (let i = 0; i < bookmarks.length; i++) {
          const dextItem = mapDextItem(bookmarks[i]);
          dextItem.score = dextItem.title.score(query);
          if (dextItem.score > 0) {
            items[i] = dextItem;
          }
        }

        const sortedItems = items.sort(sortByScore).slice(0, size);

        resolve({ items: sortedItems });
      });
    }),
};
