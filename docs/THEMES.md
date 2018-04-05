# Themes

Create a JSON module for your theme with your custom "CSS in JS" and place it in the themes directory.

Tag your theme modules with the keywords: `dext`, and `dext-theme`.

For an example, please refer to the [dext-default-theme](https://github.com/DextApp/dext-default-theme).

## Options

### window

Launcher window

### searchBase

Search bar (container)

### search

Search bar (input field)

### result

Result listing

### resultActive

Result item active state

### resultTitle

Result item title

### resultSubtitle

Result item subtitle

### resultDetails

Result details container

## Example Theme JSON

```json
{
  "window": {
    "backgroundColor": "#f7f2f0",
    "color": "#333333",
    "fontFamily": "Lucida Grande, Arial, sans-serif",
    "fontWeight": "lighter"
  },
  "searchBase": {
    "backgroundColor": "#f7f2f0"
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
  },
  "resultDetails": {
    "backgroundColor": "#f7f2f0"
  }
}
```
