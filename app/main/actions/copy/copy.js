const { clipboard } = require('electron');

// @TODO: remove `messagge`
module.exports = (message, arg) => arg && clipboard.writeText(arg);
