# Themes

Create a JSON module for your theme with your custom "CSS in JS" and place it in the themes directory.

Tag your theme modules with the keywords: `dext`, and `dext-theme`.

For an example, please refer to the [dext-default-theme](https://github.com/vutran/dext-default-theme).

## Options

### window

Launcher window

### search

Search bar

### result

Result listing

### resultActive

Result item active state

### resultTitle

Result item title

### resultSubtitle

Result item subtitle

## Example Theme JSON

```json
{
  "window": {
    "backgroundColor": "#f7f2f0",
    "color": "#333333",
    "fontFamily": "Lucida Grande, Arial, sans-serif",
    "fontWeight": "lighter"
  },
  "search": {
    "fontSize": "50"
  },
  "result": {
    "color": "#222222"
  },
  "resultActive": {
    "backgroundColor": "#dddddd"
  },
  "resultTitle": {
    "fontSize": 18
  },
  "resultSubtitle": {
    "fontSize": 11
  }
}
```
