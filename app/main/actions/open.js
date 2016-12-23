const { shell } = electron;

module.exports = (message, arg) => {
  if (arg) {
    shell.openItem(arg);
  }
};
