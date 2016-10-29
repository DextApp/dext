const electron = require('electron');

const { clipboard } = electron;

module.exports = (message, arg) => {
  if (arg) {
    clipboard.writeText(arg);
  }
};
