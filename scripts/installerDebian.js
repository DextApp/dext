const installer = require('electron-installer-debian');
const path = require('path');
const chalk = require('chalk');

const buildDeb = () => {
  const opts = {
    src: path.resolve(__dirname, '..', 'dist', 'package', 'Dext-linux-x64'),
    dest: 'dist/installers/',
    arch: 'amd64',
    productName: 'Dext',
    icon: path.resolve(__dirname, '..', 'resources', 'icon.png'),
    categories: ['Utility'],
    bin: 'Dext',
  };

  installer(opts, err => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(chalk.red(err));
    } else {
      // eslint-disable-next-line no-console
      console.log(chalk.green('Debian Package creation complete!'));
    }
  });
};

buildDeb();
