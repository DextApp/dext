const path = require('path');
const packager = require('electron-packager');
const chalk = require('chalk');

const options = {
  name: 'Dext',
  dir: path.resolve(__dirname, '..'),
  out: './dist',
  arch: 'all',
  platform: 'darwin',
  asar: true,
  overwrite: true,
};

packager(options, (err, paths) => {
  console.log(chalk.green('Packaging complete.'));
});
