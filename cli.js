#!/usr/bin/env node

const args = require('args');
const chalk = require('chalk');
const api = require('./api');

args.command(['install', 'i'], 'Install a new plugin or theme', (name, sub) => {
  const plugin = sub[0];
  return api.install(plugin)
    .then(() => console.log(chalk.green(`${plugin} installed successfully!`)))
    .catch(err => console.error(chalk.red(err)));
});

args.command(['uninstall', 'u'], 'Uninstall a plugin or theme', (name, sub) => {
  const plugin = sub[0];
  return api.uninstall(plugin)
    .then(() => console.log(chalk.green(`${plugin} uninstalled successfully!`)))
    .catch(err => console.error(chalk.red(err)));
});

args.command(['theme', 't'], 'Sets a theme', (name, sub) => {
  const theme = sub[0];
  return api.setTheme(theme)
    .then(() => console.log(chalk.green(`${theme} has been set successfully!`)))
    .catch(err => console.error(chalk.red(err)));
});

const flags = args.parse(process.argv);

if (Object.keys(flags).length !== 0) {
  args.showHelp();
}
