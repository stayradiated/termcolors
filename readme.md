# TermColors

> Import and export between multiple terminal colour scheme formats

## Installation

```
npm install --save termcolors
```

## Usage

```javascript
var fs = require('fs');
var termcolors = require('termcolors');

var xresources = fs.readFileSync('~/.Xresources', 'utf8');
var colors = termcolors.xresources.import(xresources);

var iterm = termcolors.iterm.export(colors);
fs.writeFile('~/config.itermcolors', iterm);
```

## Supported Formats

**Gnome**

- `gnome`
- Export

**Guake**

- `guake`
- Export

**iTerm2**

- `iterm`
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

**Terminator**

- `terminator`
- Export

**Termite**

- `termite`
- Import
- Export

**XFCE4 Terminal**

- `xfce`
- Export

**Xresources**

- `xresources`
- Import
- Export


