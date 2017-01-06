const { clipboard } = require('electron');

module.exports = (message, arg) => {
  if (arg) {
    electron.clipboard.writeText(arg);
  }
};
