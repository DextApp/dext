# Dext

[![Build Status](https://travis-ci.org/vutran/dext.svg?branch=master)](https://travis-ci.org/vutran/dext) [![Join the chat at https://gitter.im/dext-app/Lobby](https://badges.gitter.im/dext-app/Lobby.svg)](https://gitter.im/dext-app/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> A smart launcher for Mac. Powered by JavaScript.

![](screenshot.gif?raw=true)

Screenshot is using the [dext-github-plugin](https://github.com/vutran/dext-github-plugin) workflow.

## Overview

**Dext** is a JavaScript powered smart launcher. Built with JavaScript behind the influences of *Alfred*.

Made compatible with *Alfred* workflows that is powered by node (see: [alfy](https://github.com/sindresorhus/alfy)).

***Note: Currently available only for Mac OS X platform. Please help contribute for Windows and Linux users.***

## Install

Download the latest zip file [here](https://github.com/vutran/dext/releases/) and unzip the archive. Open `Dext.app` and follow the instructions below for usage.

**NOTE: Release version may not be stable as Dext is still in it's early stage of development. Please help [contribute](CONTRIBUTING.md) towards a stable build.**

## Usage

### Toggle Dext Bar

Simply toggle and start typing with:

<kbd>cmd</kbd> + <kbd>space</kbd>

### Actions

Each item may have it's own action. You can execute an item by double-clicking on the item or selecting it and pressing:

<kbd>enter</kbd>

### Help/About

Type `?`

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

### Core Plugins

- [dext-core-plugin-bookmarks](https://github.com/vutran/dext-core-plugin-bookmarks) - Search your Chrome bookmarks.
- [dext-core-plugin-calculator](https://github.com/vutran/dext-core-plugin-calculator) - Quickly calculate something.

### Community Plugins

- [dext-docker-registry-plugin](https://github.com/vutran/dext-docker-registry-plugin) - Search the Docker Registry for images.
- [dext-github-plugin](https://github.com/vutran/dext-github-plugin) - Search for repositories by name on GitHub.
- [dext-hackernews-plugin](https://github.com/vutran/dext-hackernews-plugin) - Search for best, top, or newest stories on Hacker News.

## Developers Documentation

- [Plugins](docs/PLUGINS.md)
- [Themes](docs/THEMES.md)

## Goals

- To provide a free/open-source alternative to *Spotlight*, and *Alfred*.
- Preserve compatibility with existing *Alfred* workflows.
- Allow customization and extending via plugins and themes.

## Contributing

♥ ***Dext*** and want to contribute? I am seeking contributors of any levels to help grow the application. You can help contribute to the growth of this application in many ways.

- [Bug Reports](CONTRIBUTING.md#bug-reports)
- [Feature Requests](CONTRIBUTING.md#feature-requests)
- [Pull Requests](CONTRIBUTING.md#pull-requests)
- [Feedback and Suggestions](CONTRIBUTING.md#feedback-and-suggestions)


## LICENSE

MIT © [Vu Tran](https://github.com/vutran/)
