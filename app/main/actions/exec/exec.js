const path = require('path');
const { fork } = require('child_process');

// accepts an absolute path or resolve the path
// relative to the plugin's directory
// @TODO: throw an error when `message` is nil
// @TODO: consider another name for message
module.exports = (message, options) => {
  if (options.script) {
    fork(
      path.isAbsolute(options.script)
        ? options.script
        : path.resolve(message.item.plugin.path, options.script),
      options.arg,
      {
        cwd: message.item.plugin.path,
      }
    );
  }
};
