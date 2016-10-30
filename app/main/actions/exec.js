const { fork } = require('child_process');

module.exports = (message, arg) => {
  if (arg) {
    fork(arg, {
      cwd: message.item.plugin.path,
    });
  }
};
