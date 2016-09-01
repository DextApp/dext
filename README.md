# Dext

> A smart launcher for Mac. Powered by JavaScript.

![](screenshot.gif?raw=true)

Screenshot is using the [dext-github-plugin](https://github.com/vutran/dext-github-plugin) workflow.

## Overview

**Dext** is a JavaScript powered smart launcher. Built with JavaScript behind the influences of Alfred.

Made compatible with Alfred workflows that is powered by node (see: [alfy](https://github.com/sindresorhus/alfy)).

***Note: Currently available only for Mac OS X platform. Please help contribute for Windows and Linux users.***

## Install

Download the latest zip file [here](releases/Dext.zip?raw=true) and unzip the archive. Open `Dext.app` and follow the instructions below for usage.

**NOTE: Release version may not be stable as Dext is still in it's early stage of development. Please help [contribute](#contribute) towards a stable build.**

## Usage

<kbd>cmd</kbd> + <kbd>space</kbd> to toggle the ***Dext*** command bar and start typing something.

Double-click or press <kbd>enter</kbd> on a selected item to execute the action for the given item.

## Dext Package Manager

[Dext Package Manager (`dpm`)](https://github.com/vutran/dext-cli) is available to download separately. `dpm` can be used to easily install and configure your ***Dext*** instance. Please refer to the docs over at the [`dpm`](https://github.com/vutran/dext-cli) repository for more information.

```bash
$ npm install -g dext-cli
```

## Configuring

The ***Dext*** configuration file is located in the `.dext` folder in your home directory (`~/.dext/`). This directory should contain a `config.json` file as well as a `plugins` folder. In here, you can drop any plugins.

*Hint: Use [`dpm`](https://github.com/vutran/dext-cli) to easily manage plugins.*

```
.dext/
| --- config.json
| --- plugins/
| --- | --- dext-github-plugin/
| --- | --- dext-hackernews-plugin/
```

## Documentation

- [Plugins](docs/PLUGINS.md)
- [Themes](docs/THEMES.md)

## Core Plugins

- [dext-core-plugin-bookmarks](https://github.com/vutran/dext-core-plugin-bookmarks) - Search your Chrome bookmarks.
- [dext-core-plugin-calculator](https://github.com/vutran/dext-core-plugin-calculator) - Quickly calculate something.

## Other Plugins

- [dext-github-plugin](https://github.com/vutran/dext-github-plugin)
- [dext-hackernews-plugin](https://github.com/vutran/dext-hackernews-plugin)

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
