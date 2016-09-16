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

module.exports = {
  action: 'openurl',
  execute: (query, { size }) => new Promise(resolve => {
    browserBookmarks.getChrome().then(bookmarks => {
      // resolve and exist if there's no bookmarks
      if (!bookmarks.length) {
        resolve([]);
        return;
      }

      // map to Dext items and apply scores
      const items = bookmarks.map((bookmark) => {
        const dextItem = mapDextItem(bookmark);
        const score = dextItem.title.score(query);
        return Object.assign({}, dextItem, {
          score,
        });
      });

      const sortedItems = items
        // filter out 0's
        .filter(i => i.score > 0)
        // sort by score
        .sort((a, b) => {
          const scoreA = a.title.score(query);
          const scoreB = b.title.score(query);
          if (scoreA === scoreB) {
            return 0;
          } else if (scoreA < scoreB) {
            return 1;
          }
          return -1;
        })
        .slice(0, size)
      resolve({ items: sortedItems });
    });
  }),
};
