const path = require('path');
const { exec } = require('child_process');
const chalk = require('chalk');

const archive = filename =>
  new Promise(resolve => {
    const { name } = path.parse(filename);
    const cmd = [
      'cd dist',
      'mkdir -p releases',
      'cd package',
      `zip -9 -r --symlinks ../releases/${filename} ${name}`,
    ].join(' && ');
    exec(cmd, { maxBuffer: 1024 * 1024 * 1024 }, err => {
      resolve({ err, options: { filename } });
    });
  });

/**
 * Print the status of the archive
 */
const printStatus = ({ err, options }) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(chalk.red(`${options.filename} archiving error.`));
  } else {
    // eslint-disable-next-line no-console
    console.log(chalk.green(`${options.filename} archive complete.`));
  }
};

// start archiving
archive('Dext-darwin-x64.zip').then(printStatus);
