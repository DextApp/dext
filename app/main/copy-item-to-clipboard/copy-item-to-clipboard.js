const { clipboard } = require('electron');

const copyItemToClipboard = (evt, item) => {
  clipboard.writeText(item.text && item.text.copy ? item.text.copy : item.arg);
};

module.exports = copyItemToClipboard;
