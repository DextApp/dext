const bookmarks = require('dext-core-plugin-bookmarks');

module.exports = {
  action: 'openurl',
  execute: bookmarks.execute,
};
