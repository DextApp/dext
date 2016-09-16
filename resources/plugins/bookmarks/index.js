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
  execute: q => new Promise(resolve => {
    browserBookmarks.getChrome().then(bookmarks => {
      // resolve and exist if there's no bookmarks
      if (!bookmarks.length) {
        resolve([]);
        return;
      }
      // map to Dext
      const items = bookmarks.map(mapDextItem);
      // apply scores
      items.forEach(i => {
        i.score = i.title.score(q); // eslint-disable-line no-param-reassign
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
        // return only top 20
        .filter((a, b) => b < 20);
      resolve({ items: sortedItems });
    });
  }),
};
