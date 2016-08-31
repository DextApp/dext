const os = require('os');
const path = require('path');

exports.USER_PATH = os.homedir();
exports.DEXT_PATH = path.resolve(exports.USER_PATH, '.dext');
exports.THEME_PATH = path.resolve(exports.DEXT_PATH, 'plugins');
exports.CORE_PLUGIN_PATH = path.resolve(__dirname, '..', 'resources', 'plugins');
exports.PLUGIN_PATH = path.resolve(exports.DEXT_PATH, 'plugins');
