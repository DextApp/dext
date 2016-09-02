# Plugins

Plugin follows a simple API for producing results.

Tag your theme modules with the keywords: `dext`, and `dext-plugin`.

For an example, please refer to the [dext-demo-plugin](https://github.com/vutran/dext-demo-plugin).

## Creating Your Plugin

### Basic Module

```js
module.exports = {
  keyword: 'foo',
  action: 'openurl',
  // a helper item object to display to the user (see Item schema below)
  helper: {
    title: 'This is the title',
    subtitle: 'This is the subtitle',
  },
  execute: {
    items: [], // array of items (refer to the item schema below)
  },
};
```

### Using Funtions

```js
module.exports = {
  keyword: 'foo',
  action: 'openurl',
  helper: function(q) {
    // q is exposed when used as a function
    // return a single item (see Item schema below)
    return {
      title: 'Search for ' + q,
      subtitle: 'This is the subtitle',
    };
  },
  execute: function(q) {
    // q is the query the user entered (excludes the keyword)
    // do something here like query a remote database to retrieve results
    return {
      items: [], // array of items (refer to the item schema below)
    };
  },
};
```

### Using Promises

```js
module.exports = {
  keyword: 'foo',
  action: 'openurl',
  helper: function(q) {
    // Promise works for helpers as well
    return new Promise(function(resolve) {
      // resolve a single item (see Item schema below)
      resolve({
        title: 'Search for ' + q,
        subtitle: 'This is the subtitle',
      });
    });
  },
  execute: function(q) {
    // q is the query the user entered (excludes the keyword)
    // do something here like query a remote database to retrieve results
    return new Promise(function(resolve) {
      resolve({
        items: [], // array of items (refer to the item schema below)
      });
    });
  },
};
```

## Item Schema

### title

Type: `String`

The title to be displayed.

### subtitle

Type: `String`

An optional subtitle to be displayed beneath the title.

### arg

Type: `String`

Additional parameters to be passed to the action.

### icon

Type: `object`

#### Options

##### icon.type

Type: `String`

Options: `file`, `text`

##### icon.path

Type: 'String'

If `icon.type` isn't set or is `file`, the image will be served as the icon. (Can be a URL or file path.)

##### icon.letter

Type: `String`

If `icon.type` is set to `text`, a round circle will be displayed with the specified letter.

## Sample Item

```json
{
  "title": "GitHub",
  "subtitle": "Build software better, together",
  "arg": "https://github.com",
  "icon": {
    "path": "https://github.com/fluidicon.png"
  }
}
```

## Sample Item with Letter icon


```json
{
  "title": "GitHub",
  "subtitle": "Build software better, together",
  "arg": "https://github.com",
  "icon": {
    "type": "text",
    "letter": "G"
  }
}
```

## Alfred/Alfy Compatibility

You can use [alfy](https://github.com/sindresorhus/alfy) to create a workflow or you can create your own.

Your plugin should output a string representing an array of result items.
