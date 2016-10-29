const electron = require('electron');

const { shell } = electron;

module.exports = (message, arg) => {
  if (arg) {
    shell.openExternal(arg);
  }
};
