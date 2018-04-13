const electron = require('electron');

// @TODO: remove `message`
module.exports = (message, arg) => arg && electron.shell.openItem(arg);
