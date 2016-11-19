const path = require('path');
const { fork } = require('child_process');

module.exports = (message, arg) => {
  if (arg.script) {
    // accepts an absolute path or resolve the path
    // relative to the plugin's directory
    let script = arg.script;
    if (!path.isAbsolute(script)) {
      script = path.resolve(message.item.plugin.path, script);
    }
    fork(script, arg.arg, {
      cwd: message.item.plugin.path,
    });
  }
};
