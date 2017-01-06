const { shell } = electron;

module.exports = (message, arg) => {
  if (arg) {
    electron.shell.openItem(arg);
  }
};
