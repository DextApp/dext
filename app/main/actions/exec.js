const { fork } = require('child_process');

module.exports = (message, arg) => {
  if (arg.script) {
    fork(arg.script, arg.arg, {
      cwd: message.item.plugin.path,
    });
  }
};
