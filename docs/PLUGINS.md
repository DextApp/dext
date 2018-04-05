# Plugins

Plugin follows a simple API for producing results.

Tag your theme modules with the keywords: `dext`, and `dext-plugin`.

For an example, please refer to the [dext-demo-plugin](https://github.com/DextApp/dext-demo-plugin).

## Creating Your Plugin

All plugin modules are required to have a `keyword` property. You will also need to define the type of `action` for your items.

### Plugin definition

keyword   | description
---       | ---
`keyword` | the keyword filter for your plugin
`action`  | the type of action to be executed when an item is chosen
`query`   | an object containing an items array or a function returning the object or a Promise resolving the object
`details` | see __Details Pane__

### Plugin Actions

#### copy

Copies the `arg` of the selected item. (Uses modifiers where necessary).

#### exec

Executes a the node script `arg.script` of the selected item and is passed the array `arg.arg` as an argument.
The script can retrieve the arguments like this:

```js
const arg = process.argv // Returns an array of arguments:
											 // The first element is the node enviroment
											 // The second element is the script being run
											 // The third element onwards are the arguments passed on by the plugin.
```

#### open

Opens a file in the desktop's default banner.

#### openurl

Opens the item in a new browser window. (Uses modifiers where necessary).

### Examples

A very basic module.

```js
module.exports = {
  keyword: 'foo',
  action: 'openurl',
  query: {
    items: [], // array of items (refer to the item schema below)
  },
};
```

You can use functions for your search query.

```js
module.exports = {
  keyword: 'foo',
  action: 'openurl',
  query: function(q /**, options */) {
    // q is the query the user entered (excludes the keyword)
    // do something here like query a remote database to retrieve results
    return {
      items: [], // array of items (refer to the item schema below)
    };
  },
};
```

Your function can also return Promises that resolves the result object.

```js
module.exports = {
  keyword: 'foo',
  action: 'openurl',
  query: function(q /**, options */) {
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

The `options` parameter contains the following key(s):

##### _size_

Type: `Number`<br/>
You can use `size` to set a limit on an API call in your plugin

```js
query: function(q, { size }) {
  return new Promise(function(resolve) {
    request.get({ url: `example.org?search=${q}&limit=${size}` }, (err, response, body) => {
      // handle response...
    })
  });
},
```

## Helper Item

Plugin helper items can provide quick information to the user as they drill deeper into your plugin commands.

### Examples

Simple helper item.

```js
module.exports = {
  keyword: 'foo',
  action: 'openurl',
  // The helper property follows the Item schema and will be
  // shown to the user when the keyword is active
  helper: {
    title: 'This is the title',
    subtitle: 'This is the subtitle',
    icon: {
      path: './icon.png',
    },
  },
  query: {
    items: [],
  },
};
```

Like the search query, you can return the item within a `Function`.

```js
module.exports = {
  keyword: 'foo',
  action: 'openurl',
  // The query keyword is passed as the first argument in the callback function
  helper: function(q) {
    title: 'Search for ' + q,
    subtitle: 'This is the subtitle',
    icon: {
      path: './icon.png',
    },
  },
};
```

Or as a `Promise`.

```js
module.exports = {
  keyword: 'foo',
  action: 'openurl',
  // The query keyword is passed as the first argument in the callback function
  helper: function(q) {
    return new Promise(function(resolve) {
      resolve({
        title: 'Search for ' + q,
        subtitle: 'This is the subtitle',
        icon: {
          path: './icon.png',
        },
      });
    });
  },
};
```

## Details Pane

Sometimes you want to display more information to the user because a small icon with 2 lines is just not enough in some instances. A details pane can be created and shown to the user per item by creating a `details` object in your plugin module.

The Details Pane currently supports only 2 types of renderer:

- `html`
- `md`

### Options

#### type

Specify the type of renderer to use. Details Pane currently supports only `html` and `md`

Type: `String`

#### render

The rendered output.

When using `render` as a `Function`, this should return a `String` or returns a `Promise` that resolves a `String`. The currently selected `item` is passed into the callback function.

Type: `String`, `Function`


### Example

Using basic HTML.

```js
module.exports = {
  keyword: 'foo',
  query: {
    items: [], // array of items
  },
  details: {
    type: 'html',
    render: '<p>This is regular HTML.</p>',
  },
};
```

Using Markdown.

```js
module.exports = {
  keyword: 'foo',
  query: {
    items: [], // array of items
  },
  details: {
    type: 'md',
    render: '## This is Markdown',
  },
};
```

You can use a function to access the currently selected item.

```js
module.exports = {
  keyword: 'foo',
  query: {
    items: [], // array of items
  },
  details: {
    type: 'md',
    render: function(item) {
      return item.bodyContent;
    },
  },
};
```

Use a Promise if you need to do some work that requires waiting.

```js
module.exports = {
  keyword: 'foo',
  query: {
    items: [], // array of items
  },
  details: {
    type: 'md',
    render: function(item) {
      return new Promise(function(resolve) {
        // load data from an external API...
        fetch('https://my-api.com/demo/endpoint/').then(function(data) {
          resolve(loadedContent);
        });
      });
    },
  },
};
```

## Item Schema

### Properties

#### title

Type: `String`

The title to be displayed.

#### subtitle

Type: `String`

An optional subtitle to be displayed beneath the title.

#### arg

Type: `String`

Additional parameters to be passed to the action.

#### text

Type: `Object`

##### Options

###### text.copy

Type: `String`

If specified, this string will be copied into the clipboard when the user activates the copy to clipboard command: <kbd>cmd</kbd> + <kbd>c</kbd>.

#### icon

Type: `object`

##### Options

###### icon.type

Type: `String`

Options: `file`, `text`

###### icon.path

Type: `String`

If `icon.type` isn't set or is `file`, the image will be served as the icon. (Can be a URL or file path.)

###### icon.letter

Type: `String`

If `icon.type` is set to `text`, a round circle will be displayed with the specified letter.

###### icon.bgColor

Type: `String`

If `icon.type` is set to `text`, you can specify the background color of the icon with a valid CSS color value.

### Examples

Sample item with a regular URL icon.

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

Sample item with letter icon.

```json
{
  "title": "GitHub",
  "subtitle": "Build software better, together",
  "arg": "https://github.com",
  "icon": {
    "type": "text",
    "letter": "G",
    "bgColor": "transparent"
  }
}
```

## Alfred/Alfy Compatibility

You can use [alfy](https://github.com/sindresorhus/alfy) to create a workflow or you can create your own.

Your plugin should output a string representing an array of result items.
