const browserBookmarks = jest.genMockFromModule('browser-bookmarks');

let mockBookmarks = [];

browserBookmarks.mockSetBookmarks = (bookmarks) => {
  mockBookmarks = bookmarks;
};

/**
 * Mocks the getChrome() method
 *
 * @return {Promise}
 */
browserBookmarks.getChrome = () => new Promise(resolve => resolve(mockBookmarks));

module.exports = browserBookmarks;
