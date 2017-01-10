const electron = require('electron');

module.exports = (message, arg) => {
  if (arg) {
    electron.shell.openItem(arg);
  }
};
