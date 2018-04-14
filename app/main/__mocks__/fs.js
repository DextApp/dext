const fs = {};

let mockError = null;
let mockFiles = [];
let mockFileData = '';

fs.constants = require.requireActual('fs').constants;

/**
 * Sets an optional mock error
 *
 * @param {String} error
 */
fs.__setError = error => {
  mockError = error;
};

/**
 * Sets the mock return value for fs.readdir
 *
 * @param {String[]} files - An array of files
 */
fs.__setFiles = files => {
  mockFiles = files;
};

/**
 * Sets the file data for fs.readFile
 *
 * @param {String} data
 */
fs.__setFileData = data => {
  mockFileData = data;
};

/**
 * Tests a user's permission for the given path
 *
 * @see https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback
 * @param {String} path
 * @param {Number} permission - A permissions flag from fs.constants
 * @param {Function} callback
 */
fs.access = (path, permission, callback) => {
  if (mockError) {
    callback.call(null, mockError);
  } else {
    callback.call(null, null);
  }
};

/**
 * Reads the directory and apply the callback
 * with the mocked values
 *
 * @param {String} directory
 * @param {Function} callback
 */
fs.readdir = (directory, callback) => {
  if (mockError) {
    callback.call(null, mockError);
  } else {
    callback.call(null, null, mockFiles);
  }
};

/**
 * Reads the file and apply the callback
 * with the mocked data
 *
 * @param {String} file - Filename or descriptor
 * @param {Object} options - Optional
 * @param {Function} callback - Callback function when the file is read
 */
fs.readFile = (file, options, callback) => {
  let cb = null;
  // if the 2nd argument is a callback function,
  // use it, otherwise use the 3rd argument
  if (typeof options === 'function') {
    // 2nd argument is a callback function
    cb = options;
  } else {
    cb = callback;
  }
  if (mockError) {
    cb.call(null, mockError);
  } else {
    cb.call(null, null, mockFileData);
  }
};

/**
 * Checks for a file existance
 * @return {Boolean}
 */
fs.existsSync = () => false;

module.exports = fs;
