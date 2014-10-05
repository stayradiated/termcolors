# TermColors

> Import and export between multiple terminal colour scheme formats

Many templates are sourced from the
[Base16-Builder](https://github.com/chriskempson/base16-builder).

Colors are handled using
[Colr](https://github.com/stayradiated/colr).

## Installation

```
npm install termcolors
```

## Terminal Usage

Missing colors will be automatically replaced with the default colors.

``` shell
$ termcolors -i xresources -o json < ~/.Xresources > colors.json
```

## JS API Usage

```javascript
var fs = require('fs');
var termcolors = require('termcolors');

var xresources = fs.readFileSync('~/.Xresources', 'utf8');
var colors = termcolors.xresources.import(xresources);

var iterm = termcolors.iterm.export(colors);
fs.writeFile('~/config.itermcolors', iterm);
```

## Supported Formats

*Note: only a select few formats support importing.*

**Chrome Secure Shell**

- `chromeshell`
- Export

**Gnome**

- `gnome`
- Export

**Guake**

- `guake`
- Export

**iTerm**

- `iterm`
- Import
- Export

**JSON**

- `json`
- Import
- Export

**Konsole**

- `konsole`
- Export

**MinTTY**

- `mintty`
- Export

**Putty**

- `putty`
- Export

**Terminal.app**

- `terminalapp`
- Export

**Terminator**

- `terminator`
- Export

**Termite**

- `termite`
- Import
- Export

**Textmate / Sublime Text**

- `textmate`
- Export

**XFCE4 Terminal**

- `xfce`
- Export

**Xresources**

- `xresources`
- Import
- Export

## DIY Export

Templates use [doT.js](http://olado.github.io/doT/index.html).

Check the `templates` folder for some examples.

**Usage:**

`termcolors.export(template, [transformer])`

- template (string)
- transformer (function)

The transformer is an optional function that is passed the colors input into
the template and can transform them for use in the template.

This is useful so that you don't have to use the tinycolor 

**Example Without Converter:**

```javascript
var template = 'body { background {{=c.background.hexString()}}; }'

var cssTemplate = termcolors.export(template);
```

**Example With Converter:**

```javascript
var template = 'body { background: {{=c.background}}; }'

var toHex = function (colors) {
    return {
        background: colors.background.hexString();
    }
};

var cssTemplate = termcolors.export(template, toHex);
```


**Example With Lodash Mapping:**

```javascript
var _ = require('lodash');
var template = 'body { background: {{=c.background}}; }'

var toHex = _.partialRight(_.mapValues, function (color) {
    return color.hexString();
});

var cssTemplate = termcolors.export(template, toHex);
```

