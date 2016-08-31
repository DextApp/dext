# Plugins

Plugin follows a simple API for producing results.

Tag your theme modules with the keywords: `dext`, and `dext-plugin`.

For an example, please refer to the [dext-demo-plugin](https://github.com/vutran/dext-demo-plugin).

## Creating Your Plugin

### Basic modules

```js
module.exports = {
  keyword: 'foo',
  action: 'openurl',
  execute: {
    items: [], // array of items (refer to the item schema below)
  },
};
```

### Using Promises

```js
module.exports = {
  keyword: 'foo',
  action: 'openurl',
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

##### icon.path

Type: 'String'

The URL path to the icon.

## Sample

```json
{
  "title": "GitHub",
  "subtitle": "Build software better, together",
  "arg": "http://github.com",
  "icon": {
    "path": "https://github.com/fluidicon.png"
  }
}
```

## Alfred/Alfy Compatibility

You can use [alfy](https://github.com/sindresorhus/alfy) to create a workflow or you can create your own.

Your plugin should output a string representing an array of result items.
