const path = require('path');
const packager = require('electron-packager');
const chalk = require('chalk');

const DEFAULT_OPTIONS = {
  name: 'Dext',
  dir: path.resolve(__dirname, '..'),
  out: './dist/package',
  icon: path.resolve(__dirname, '..', 'resources', 'icon.icns'),
  overwrite: true,
  prune: true,
  ignore: [
    '__mocks__/',
    '__tests__/',
    'coverage/',
    'dist/',
    'docs/.*.md',
    'scripts/',
    '.babelrc',
    '.DS_Store',
    '.editorconfig',
    '.eslintignore',
    '.eslintrc',
    '.gitignore',
    '.travis.yml',
    'CONTRIBUTING.md',
    'README.md',
    'screenshot.gif',
    'webpack.config.js',
    'webpack.config.prod.js',
    'yarn.lock',
  ],
};

/**
 * Packages the app for the given platform
 *
 * @param {String} platform
 * @param {String} arch
 */
const pkg = (platform, arch) =>
  new Promise(resolve => {
    const opts = Object.assign({}, DEFAULT_OPTIONS, {
      platform,
      arch,
    });
    packager(opts, err => {
      resolve({ err, options: { platform, arch } });
    });
  });

/**
 * Print the status of the package
 */
const printStatus = ({ err, options }) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(
      chalk.red(`${options.platform}-${options.arch} packaging error.`)
    );
  } else {
    // eslint-disable-next-line no-console
    console.log(
      chalk.green(`${options.platform}-${options.arch} package complete.`)
    );
  }
};

// start packaging
pkg('darwin', 'x64').then(printStatus);
pkg('linux', 'x64').then(printStatus);
