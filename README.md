![](./resources/banner.png?raw=true)

[![Travis](https://img.shields.io/travis/vutran/dext/develop.svg?maxAge=2592000&style=flat-square)](https://travis-ci.org/vutran/dext) [![Coveralls branch](https://img.shields.io/coveralls/vutran/dext/develop.svg?maxAge=2592000&style=flat-square)](https://coveralls.io/github/vutran/dext) [![license](https://img.shields.io/github/license/vutran/dext.svg?maxAge=2592000&style=flat-square)](LICENSE) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat-square)](https://gitter.im/dext-app/Lobby)

## Overview

**Dext** is a JavaScript powered smart launcher. Built with JavaScript behind the influences of _Alfred_.

Made compatible with _Alfred_ workflows that is powered by node (see: [alfy](https://github.com/sindresorhus/alfy)).

![](screenshot.gif?raw=true)

**_Note: Currently available only for Mac OS X platform. Please help contribute for Windows and Linux users._**

## Install

Download the latest zip file [here](https://github.com/vutran/dext/releases/) and unzip the archive. Open `Dext.app` and follow the instructions below for usage.

You can also use Homebrew Cask to download the app by running these commands:

```
brew update
brew cask install dext
```

**NOTE: Release version may not be stable as Dext is still in it's early stage of development. Please help [contribute](CONTRIBUTING.md) towards a stable build.**

## Usage

### Toggle Dext Bar

Simply toggle and start typing with:

<kbd>alt</kbd> + <kbd>space</kbd>

### Actions

Each item may have it's own action. You can execute an item by double-clicking on the item or selecting it and pressing:

<kbd>enter</kbd>

### Help/About

Type `?`

## Dext Package Manager

[Dext Package Manager (`dpm`)](https://github.com/vutran/dext-cli) is available to download separately. `dpm` can be used to easily install and configure your **_Dext_** instance. Please refer to the docs over at the [`dpm`](https://github.com/vutran/dext-cli) repository for more information.

```bash
$ npm install -g dext-cli
```

## Configuring

The **_Dext_** configuration file is located in the `.dext` folder in your home directory (`~/.dext/`). This directory should contain a `config.json` file as well as a `plugins` folder. In here, you can drop any plugins.

_Hint: Use [`dpm`](https://github.com/vutran/dext-cli) to easily manage plugins._

```
.dext/
| --- config.json
| --- plugins/
| --- | --- dext-github-plugin/
| --- | --- dext-hackernews-plugin/
```

### Core Plugins

* **Bookmarks** - Search your Chrome bookmarks.
* **Browser** - Quick open your browser to a given URL.
* **Calculator** - Quickly calculate something.
* **Screen Saver** - Starts the screen saver.

### Community Plugins

* [dext-darwin-applications-plugin](https://github.com/vutran/dext-darwin-applications-plugin) - Dext plugin to search for applications (Darwin only).
* [dext-docker-registry-plugin](https://github.com/vutran/dext-docker-registry-plugin) - Search the Docker Registry for images.
* [dext-emoji-plugin](https://github.com/vutran/dext-emoji-plugin) - Search for emojis.
* [dext-giphy-plugin](https://github.com/adnasa/dext-giphy-plugin) - Search for giphy images.
* [dext-github-plugin](https://github.com/vutran/dext-github-plugin) - Search for repositories by name on GitHub.
* [dext-hackernews-plugin](https://github.com/vutran/dext-hackernews-plugin) - Search for best, top, or newest stories on Hacker News.
* [dext-npms-plugin](https://github.com/hypebeast/dext-npms-plugin) - Search for npm packages on npms.io.
* [dext-omdb-plugin](https://github.com/adnasa/dext-omdb-plugin) - Search for imdb movies through the omdb-api.
* [dext-base64-encode-plugin](https://github.com/brpaz/dext-base64-encode-plugin) - Dext plugin that allows to encode and decode any text into base64.
* [dext-rubygems-plugin](https://github.com/akz92/dext-rubygems-plugin) - Search for ruby gems on rubygems.org.
* [dext-search-plugin](https://github.com/justinpchang/dext-search-plugin) - Search Google and open results in web browser.
* [dext-plugin-list-plugin](https://github.com/justinpchang/dext-plugin-list-plugin) - Display list of all active plugins.
* [dext-system-plugin](https://github.com/justinpchang/dext-system-plugin) - Display system and battery information.

### Community Themes

* [dext-predawn-theme](https://github.com/adnasa/dext-predawn-theme) - Predawn theme for Dext
* [dext-nova-theme](https://github.com/vutran/dext-nova-theme) - Nova theme for Dext

## Developers Documentation

* [Plugins](docs/PLUGINS.md)
* [Themes](docs/THEMES.md)

## Goals

* To provide a free/open-source alternative to _Spotlight_, and _Alfred_.
* Preserve compatibility with existing _Alfred_ workflows.
* Allow customization and extending via plugins and themes.

## Contributing

♥ **_Dext_** and want to contribute? I am seeking contributors of any levels to help grow the application. You can help contribute to the growth of this application in many ways.

* [Bug Reports](CONTRIBUTING.md#bug-reports)
* [Feature Requests](CONTRIBUTING.md#feature-requests)
* [Pull Requests](CONTRIBUTING.md#pull-requests)
* [Feedback and Suggestions](CONTRIBUTING.md#feedback-and-suggestions)

## Support

Like what you see? [Become a Patron](https://www.patreon.com/vutran) and support me via a monthly donation.

## LICENSE

MIT © [Vu Tran](https://github.com/vutran/)
