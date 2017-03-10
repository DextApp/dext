const electron = {};

electron.app = {
  getFileIcon: (path, callback) => {
    callback(null, null);
  },
};

module.exports = electron;
