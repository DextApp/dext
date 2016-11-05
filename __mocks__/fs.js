const fs = {};

let mockFiles = [];
let mockFileData = '';

/**
 * Sets the mock return value for fs.readdir
 *
 * @param {String[]} files - An array of files
 */
fs.__setFiles = (files) => {
  mockFiles = files;
};

/**
 * Sets the file data for fs.readFile
 *
 * @param {String} data
 */
fs.__setFileData = (data) => {
  mockFileData = data;
};

/**
 * Reads the directory and apply the callback
 * with the mocked values
 *
 * @param {String} directory
 * @param {Function} callback
 */
fs.readdir = (directory, callback) => {
  callback.call(null, null, mockFiles);
};

/**
 * Reads the file and apply the callback
 * with the mocked data
 *
 * @param {String} file
 * @param {Function} callback
 */
fs.readFile = (file, callback) => {
  callback.call(null, null, mockFileData);
};

module.exports = fs;
