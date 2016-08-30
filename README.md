# Dext

> A smart launcher for Mac. Powered by JavaScript.

![](screenshot.gif?raw=true)

Screenshot is using the [dext-github-plugin](https://github.com/vutran/dext-github-plugin) workflow.

## Overview

**Dext** is a JavaScript powered smart launcher. Built with JavaScript behind the influences of Alfred.

Made compatible with Alfred workflows that is powered by node (see: [alfy](https://github.com/sindresorhus/alfy)).

***Note: Currently available only for Mac OS X platform. Please help contribute for Windows and Linux users.***

## Install

```bash
$ npm install dext
```

## Installing Plugins and Themes

Dext Package Manager is included out of the box to allow for managing configurations easily. (This package may be extracted in the future to keep the app file size low)

### Activating the CLI

```bash
# link the module globally to create a symlink to the bin file
$ npm link
```

### CLI Usage

Once the `dpm` has been linked, you can start accessing it's functions. See examples below:

```bash
# installs a new plugin/theme
$ dpm install dext-my-plugin

# uninstalls an existing plugin/theme
$ dpm uninstall dext-my-plugin

# sets a new theme
$ dpm theme dext-my-theme
```

## Documentation

- [Plugins](docs/PLUGINS.md)
- [Themes](docs/THEMES.md)

## Plugins

- [dext-github-plugin](https://github.com/vutran/dext-github-plugin)
- [dext-hackernews-plugin](https://github.com/vutran/dext-hackernews-plugin)
- [dext-chrome-bookmarks-plugin](https://github.com/vutran/dext-chrome-bookmarks-plugin)

## Themes

- [dext-default-theme](https://github.com/vutran/dext-default-theme)

## Goals

- To provide a free/open-source alternative to Spotlight, and Alfred.
- Preserve compatibility with existing Alfred workflows.
- Allow customization and extending via plugins and themes.

## Contribute

I'm looking for contributors to help grow the application. **Dext** is still in its very early stage of development and lots of new features and improvements will be added over time.

1. [Fork](https://help.github.com/articles/fork-a-repo/) and [clone](https://help.github.com/articles/cloning-a-repository/) this repository.
2. Install dependencies with `npm install`
3. Boot up the application with `npm start`

## LICENSE

MIT © [Vu Tran](https://github.com/vutran/)
