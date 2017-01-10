const { clipboard } = require('electron');

module.exports = (message, arg) => {
  if (arg) {
    clipboard.writeText(arg);
  }
};
