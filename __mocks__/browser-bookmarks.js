const browserBookmarks = jest.genMockFromModule('browser-bookmarks');

let mockBookmarks = [];

/**
 * Set mocked bookmark entries
 */
browserBookmarks.__setBookmarks = bookmarks => {
  mockBookmarks = bookmarks;
};

/**
 * Mocks the getChrome() method
 *
 * @return {Promise}
 */
browserBookmarks.getChrome = () =>
  new Promise(resolve => resolve(mockBookmarks));

module.exports = browserBookmarks;
