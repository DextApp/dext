const path = require('path');

const WINDOW_DEFAULT_WIDTH = 700;
const WINDOW_DEFAULT_HEIGHT = 80;
const WINDOW_MIN_HEIGHT = 80;
// results + query + padding
const WINDOW_MAX_HEIGHT = 710;

module.exports = {
  MAX_RESULTS: 20,
  IS_DEV: process.env.NODE_ENV === 'development',
  CORE_PLUGIN_PATH: path.resolve(__dirname, '..', 'resources', 'plugins'),
  // ms
  DEBOUNCE_TIME: 150,
  WINDOW_DEFAULT_HEIGHT,
  WINDOW_DEFAULT_WIDTH,
  WINDOW_MAX_HEIGHT,
  WINDOW_MIN_HEIGHT,
};
