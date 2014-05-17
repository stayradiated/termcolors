!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.termColors=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports = {
  css:         _dereq_('./lib/formats/css'),
  defaults:    _dereq_('./lib/formats/defaults'),
  iterm:       _dereq_('./lib/formats/iterm'),
  mintty:      _dereq_('./lib/formats/mintty'),
  termite:     _dereq_('./lib/formats/termite'),
  url:         _dereq_('./lib/formats/url'),
  xfce:        _dereq_('./lib/formats/xfce'),
  xresources:  _dereq_('./lib/formats/xresources'),
};

},{"./lib/formats/css":3,"./lib/formats/defaults":4,"./lib/formats/iterm":5,"./lib/formats/mintty":6,"./lib/formats/termite":7,"./lib/formats/url":8,"./lib/formats/xfce":9,"./lib/formats/xresources":10}],2:[function(_dereq_,module,exports){
var _ = _dereq_('lodash');
var dot = _dereq_('dot');
var tiny = _dereq_('./tiny');

var dotOptions = {
  evaluate:    /\{\{([\s\S]+?)\}\}/g,
  interpolate: /\{\{=([\s\S]+?)\}\}/g,
  encode:      /\{\{!([\s\S]+?)\}\}/g,
  use:         /\{\{#([\s\S]+?)\}\}/g,
  define:      /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
  conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
  iterate:     /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
  varname: 'c',
  strip: false,
  append: true,
  selfcontained: false
};

var exportColors = function (colors) {
  return _.mapValues(colors, function (value) {
    return {
      hex: value.toHexString(),
      rgb: value.toRgbArray(),
      srgb: value.toSrgbArray(),
      dhex: value.to12HexString()
    };
  });
};

var createExporter = function (template) {
  template = dot.template(template, dotOptions);
  return function (colors) {
    return template(exportColors(colors));
  };
};

module.exports = createExporter;

},{"./tiny":11}],3:[function(_dereq_,module,exports){

var createExporter = _dereq_('../exporter');

var template = ".fg-bg{color:{{=c.background.hex}} !important;}\n.bg-bg{background:{{=c.background.hex}} !important;}\n.fg-fg{color:{{=c.foreground.hex}} !important;}\n.bg-fg{background:{{=c.foreground.hex}} !important;}\n.fg-0{color:{{=c[0].hex}} !important;}\n.bg-0{background:{{=c[0].hex}} !important;}\n.fg-1{color:{{=c[1].hex}} !important;}\n.bg-1{background:{{=c[1].hex}} !important;}\n.fg-2{color:{{=c[2].hex}} !important;}\n.bg-2{background:{{=c[2].hex}} !important;}\n.fg-3{color:{{=c[3].hex}} !important;}\n.bg-3{background:{{=c[3].hex}} !important;}\n.fg-4{color:{{=c[4].hex}} !important;}\n.bg-4{background:{{=c[4].hex}} !important;}\n.fg-5{color:{{=c[5].hex}} !important;}\n.bg-5{background:{{=c[5].hex}} !important;}\n.fg-6{color:{{=c[6].hex}} !important;}\n.bg-6{background:{{=c[6].hex}} !important;}\n.fg-7{color:{{=c[7].hex}} !important;}\n.bg-7{background:{{=c[7].hex}} !important;}\n.fg-8{color:{{=c[8].hex}} !important;}\n.bg-8{background:{{=c[8].hex}} !important;}\n.fg-9{color:{{=c[9].hex}} !important;}\n.bg-9{background:{{=c[9].hex}} !important;}\n.fg-10{color:{{=c[10].hex}} !important;}\n.bg-10{background:{{=c[10].hex}} !important;}\n.fg-11{color:{{=c[11].hex}} !important;}\n.bg-11{background:{{=c[11].hex}} !important;}\n.fg-12{color:{{=c[12].hex}} !important;}\n.bg-12{background:{{=c[12].hex}} !important;}\n.fg-13{color:{{=c[13].hex}} !important;}\n.bg-13{background:{{=c[13].hex}} !important;}\n.fg-14{color:{{=c[14].hex}} !important;}\n.bg-14{background:{{=c[14].hex}} !important;}\n.fg-15{color:{{=c[15].hex}} !important;}\n.bg-15{background:{{=c[15].hex}} !important;}\n";

module.exports = {
  export : createExporter(template)
};

},{"../exporter":2}],4:[function(_dereq_,module,exports){
var _ = _dereq_('lodash');
var tiny = _dereq_('tinytinycolor');

var defaultColors = {
  0: '#000000',
  1: '#cc0403',
  2: '#19cb00',
  3: '#cecb00',
  4: '#001cd1',
  5: '#cb1ed1',
  6: '#0dcdcd',
  7: '#e5e5e5',
  8: '#4d4d4d',
  9: '#3e0605',
  10: '#23fd00',
  11: '#fffd00',
  12: '#0026ff',
  13: '#fd28ff',
  14: '#14ffff',
  15: '#ffffff',
  background: '#000000',
  foreground: '#ffffff'
};

for (var key in defaultColors) {
  if (! defaultColors.hasOwnProperty(key)) continue;
  defaultColors[key] = tiny(defaultColors[key]);
}

module.exports = {

  fill: function (colors) {
    return _.defaults(colors, defaultColors);
  },

  colors: defaultColors

};

},{"tinytinycolor":15}],5:[function(_dereq_,module,exports){
var _ = _dereq_('lodash');

var tiny = _dereq_('tinytinycolor');
var createExporter = _dereq_('../exporter');

var template = "xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">\n<plist version=\"1.0\">\n<dict>\n\t<key>Ansi 0 Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c[0].srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c[0].srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c[0].srgb[0]}}</real>\n\t</dict>\n\t<key>Ansi 1 Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c[1].srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c[1].srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c[1].srgb[0]}}</real>\n\t</dict>\n\t<key>Ansi 10 Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c[10].srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c[10].srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c[10].srgb[0]}}</real>\n\t</dict>\n\t<key>Ansi 11 Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c[11].srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c[11].srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c[11].srgb[0]}}</real>\n\t</dict>\n\t<key>Ansi 12 Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c[12].srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c[12].srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c[12].srgb[0]}}</real>\n\t</dict>\n\t<key>Ansi 13 Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c[13].srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c[13].srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c[13].srgb[0]}}</real>\n\t</dict>\n\t<key>Ansi 14 Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c[14].srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c[14].srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c[14].srgb[0]}}</real>\n\t</dict>\n\t<key>Ansi 15 Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c[15].srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c[15].srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c[15].srgb[0]}}</real>\n\t</dict>\n\t<key>Ansi 2 Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c[2].srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c[2].srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c[2].srgb[0]}}</real>\n\t</dict>\n\t<key>Ansi 3 Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c[3].srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c[3].srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c[3].srgb[0]}}</real>\n\t</dict>\n\t<key>Ansi 4 Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c[4].srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c[4].srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c[4].srgb[0]}}</real>\n\t</dict>\n\t<key>Ansi 5 Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c[5].srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c[5].srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c[5].srgb[0]}}</real>\n\t</dict>\n\t<key>Ansi 6 Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c[6].srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c[6].srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c[6].srgb[0]}}</real>\n\t</dict>\n\t<key>Ansi 7 Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c[7].srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c[7].srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c[7].srgb[0]}}</real>\n\t</dict>\n\t<key>Ansi 8 Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c[8].srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c[8].srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c[8].srgb[0]}}</real>\n\t</dict>\n\t<key>Ansi 9 Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c[9].srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c[9].srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c[9].srgb[0]}}</real>\n\t</dict>\n\t<key>Background Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c.background.srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c.background.srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c.background.srgb[0]}}</real>\n\t</dict>\n\t<key>Bold Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c.foreground.srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c.foreground.srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c.foreground.srgb[0]}}</real>\n\t</dict>\n\t<key>Cursor Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c.foreground.srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c.foreground.srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c.foreground.srgb[0]}}</real>\n\t</dict>\n\t<key>Cursor Text Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c.background.srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c.background.srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c.background.srgb[0]}}</real>\n\t</dict>\n\t<key>Foreground Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c.foreground.srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c.foreground.srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c.foreground.srgb[0]}}</real>\n\t</dict>\n\t<key>Selected Text Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c.foreground.srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c.foreground.srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c.foreground.srgb[0]}}</real>\n\t</dict>\n\t<key>Selection Color</key>\n\t<dict>\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t\t<key>Blue Component</key>\n\t\t<real>{{=c.background.srgb[2]}}</real>\n\t\t<key>Green Component</key>\n\t\t<real>{{=c.background.srgb[1]}}</real>\n\t\t<key>Red Component</key>\n\t\t<real>{{=c.background.srgb[0]}}</real>\n\t</dict>\n</dict>\n</plist>\n";

var lookup = {
  'Background Color': 'background',
  'Foreground Color': 'foreground',
  'Ansi 0 Color': '0',
  'Ansi 8 Color': '8',
  'Ansi 1 Color': '1',
  'Ansi 9 Color': '9',
  'Ansi 2 Color': '2',
  'Ansi 10 Color': '10',
  'Ansi 3 Color': '3',
  'Ansi 11 Color': '11',
  'Ansi 4 Color': '4',
  'Ansi 12 Color': '12',
  'Ansi 5 Color': '5',
  'Ansi 13 Color': '13',
  'Ansi 6 Color': '6',
  'Ansi 14 Color': '14',
  'Ansi 7 Color': '7',
  'Ansi 15 Color': '15'
};

var regex = {
  group: /<key>([^<]*)<\/key>\s*<dict>/gi,
  component: /<key>(Blue|Green|Red) Component<\/key>/gi,
  real: /<real>([\d.]+)<\/real>/gi
};

module.exports = {

  import: function (input) {
    regex.group.lastIndex = 0;
    var output = {};

    var group;
    while ((group = regex.group.exec(input)) !== null) {
      var groupName = group[1];
      var colorName = lookup[groupName];
      if (! colorName) continue;

      regex.component.lastIndex = group.index;
      var color = {};
      for (var i = 0; i < 3; i++) {
        var component = regex.component.exec(input);
        if (! component) continue;

        var componentName = component[1].toLowerCase();
        regex.real.lastIndex = component.index;
        color[componentName] = regex.real.exec(input)[1] * 255;
      }
      output[colorName] = tiny({
        r: color.red, g: color.green, b: color.blue
      });
    }

    return output;
  },

  export: createExporter(template)

};

},{"../exporter":2,"tinytinycolor":15}],6:[function(_dereq_,module,exports){

var createExporter = _dereq_('../exporter');

var template = "BackgroundColour={{=c.background.rgb[0]}},{{=c.background.rgb[1]}},{{=c.background.rgb[2]}}\nForegroundColour={{=c.foreground.rgb[0]}},{{=c.foreground.rgb[1]}},{{=c.foreground.rgb[2]}}\nCursorColour={{=c.foreground.rgb[0]}},{{=c.foreground.rgb[1]}},{{=c.foreground.rgb[2]}}\nBlack={{=c[0].rgb[0]}},{{=c[0].rgb[1]}},{{=c[0].rgb[2]}}\nBoldBlack={{=c[8].rgb[0]}},{{=c[8].rgb[1]}},{{=c[8].rgb[2]}}\nRed={{=c[1].rgb[0]}},{{=c[1].rgb[1]}},{{=c[1].rgb[2]}}\nBoldRed={{=c[9].rgb[0]}},{{=c[9].rgb[1]}},{{=c[9].rgb[2]}}\nGreen={{=c[2].rgb[0]}},{{=c[2].rgb[1]}},{{=c[2].rgb[2]}}\nBoldGreen={{=c[10].rgb[0]}},{{=c[10].rgb[1]}},{{=c[10].rgb[2]}}\nYellow={{=c[3].rgb[0]}},{{=c[3].rgb[1]}},{{=c[3].rgb[2]}}\nBoldYellow={{=c[11].rgb[0]}},{{=c[11].rgb[1]}},{{=c[11].rgb[2]}}\nBlue={{=c[4].rgb[0]}},{{=c[4].rgb[1]}},{{=c[4].rgb[2]}}\nBoldBlue={{=c[12].rgb[0]}},{{=c[12].rgb[1]}},{{=c[12].rgb[2]}}\nMagenta={{=c[5].rgb[0]}},{{=c[5].rgb[1]}},{{=c[5].rgb[2]}}\nBoldMagenta={{=c[13].rgb[0]}},{{=c[13].rgb[1]}},{{=c[13].rgb[2]}}\nCyan={{=c[6].rgb[0]}},{{=c[6].rgb[1]}},{{=c[6].rgb[2]}}\nBoldCyan={{=c[14].rgb[0]}},{{=c[14].rgb[1]}},{{=c[14].rgb[2]}}\nWhite={{=c[7].rgb[0]}},{{=c[7].rgb[1]}},{{=c[7].rgb[2]}}\nBoldWhite={{=c[15].rgb[0]}},{{=c[15].rgb[1]}},{{=c[15].rgb[2]}}\n";

module.exports = {
  export: createExporter(template)
};

},{"../exporter":2}],7:[function(_dereq_,module,exports){
var _ = _dereq_('lodash');

var tiny = _dereq_('tinytinycolor');
var createExporter = _dereq_('../exporter');

var template = "[colors]\n\n# special\nforeground      = {{=c.foreground.hex}}\nforeground_bold = {{=c.foreground.hex}}\ncursor          = {{=c.foreground.hex}}\nbackground      = {{=c.background.hex}}\n\n# black\ncolor0  = {{=c[0].hex}}\ncolor8  = {{=c[8].hex}}\n\n# red\ncolor1  = {{=c[1].hex}}\ncolor9  = {{=c[9].hex}}\n\n# green\ncolor2  = {{=c[2].hex}}\ncolor10 = {{=c[10].hex}}\n\n# yellow\ncolor3  = {{=c[3].hex}}\ncolor11 = {{=c[11].hex}}\n\n# blue\ncolor4  = {{=c[4].hex}}\ncolor12 = {{=c[12].hex}}\n\n# magenta\ncolor5  = {{=c[5].hex}}\ncolor13 = {{=c[13].hex}}\n\n# cyan\ncolor6  = {{=c[6].hex}}\ncolor14 = {{=c[14].hex}}\n\n# white\ncolor7  = {{=c[7].hex}}\ncolor15 = {{=c[15].hex}}\n";

var regex = {
  color: /(foreground|background|color(\d\d?))\s*=\s*(#[a-f0-9]{6})/gi,
  comment: /^\s*#.*$/mg
};

module.exports = {

  import: function (input) {
    var output = {};
    var match;

    // remove comments
    input = input.replace(regex.comment, '');

    // match colors
    regex.color.lastIndex = 0;
    while ((match = regex.color.exec(input)) !== null) {
      // if is colorN use N else use foreground/background
      var index = match[2] ? match[2] : match[1];
      output[index] = tiny(match[3]);
    }

    return output;
  },

  export: createExporter(template)

};

},{"../exporter":2,"tinytinycolor":15}],8:[function(_dereq_,module,exports){
(function (Buffer){
var _ = _dereq_('lodash');
var base64 = _dereq_('urlsafe-base64');
var tiny = _dereq_('tinytinycolor');

var ORDER = [
  'background', 'foreground',
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
];


module.exports = {

  /*
   * url.import
   *
   * Convert a 76 byte string into a collection of colors
   *
   * - input (string)
   * > output (object)
   */

  import: function (input) {
    var output = {};
    var buffer = base64.decode(input);

    for (var i = 0, len = ORDER.length; i < len; i++) {
      var id = ORDER[i];
      var color = buffer.slice(i * 3, i * 3 + 3).toString('hex');
      output[id] = tinycolor(color);
    }

    return output;
  },


  /*
   * url.export
   *
   * Convert into a 76 byte url-base64 string to save space
   *
   * - input (object)
   * > output (string)
   */

  export: function (input) {
    var array = _.chain(ORDER).map(function (name) {
      return input[name].toRgbArray();
    }).flatten().value();

    var buffer = new Buffer(array);
    return base64.encode(buffer);
  }

};

}).call(this,_dereq_("buffer").Buffer)
},{"buffer":12,"tinytinycolor":15,"urlsafe-base64":16}],9:[function(_dereq_,module,exports){

var createExporter = _dereq_('../exporter');

var template = "[Configuration]\nColorCursor={{=c.foreground.dhex}}\nColorForeground={{=c.foreground.dhex}}\nColorBackground={{=c.background.dhex}}\nColorPalette={{=c[0].dhex}};{{=c[1].dhex}};{{=c[2].dhex}};{{=c[3].dhex}};{{=c[4].dhex}};{{=c[5].dhex}};{{=c[6].dhex}};{{=c[7].dhex}};{{=c[8].dhex}};{{=c[9].dhex}};{{=c[10].dhex}};{{=c[11].dhex}};{{=c[12].dhex}};{{=c[13].dhex}};{{=c[14].dhex}};{{=c[15].dhex}}\n";

module.exports = {
  export: createExporter(template)
};

},{"../exporter":2}],10:[function(_dereq_,module,exports){

var tiny = _dereq_('tinytinycolor');
var createExporter = _dereq_('../exporter');

var template = "#define foreground     {{=c.foreground.hex}}\n#define background     {{=c.background.hex}}\n#define black          {{=c[0].hex}}\n#define red            {{=c[1].hex}}\n#define green          {{=c[2].hex}}\n#define yellow         {{=c[3].hex}}\n#define blue           {{=c[4].hex}}\n#define magenta        {{=c[5].hex}}\n#define cyan           {{=c[6].hex}}\n#define white          {{=c[7].hex}}\n#define bright_black   {{=c[8].hex}}\n#define bright_red     {{=c[9].hex}}\n#define bright_green   {{=c[10].hex}}\n#define bright_yellow  {{=c[11].hex}}\n#define bright_blue    {{=c[12].hex}}\n#define bright_magenta {{=c[13].hex}}\n#define bright_cyan    {{=c[14].hex}}\n#define bright_white   {{=c[15].hex}}\n\n! special\n*.foreground:   foreground\n*.background:   background\n*.cursorColor:  foreground\n\n! black\n*.color0:       black\n*.color8:       bright_black\n\n! red\n*.color1:       red\n*.color9:       bright_red\n\n! green\n*.color2:       green\n*.color10:      bright_green\n\n! yellow\n*.color3:       yellow\n*.color11:      bright_yellow\n\n! blue\n*.color4:       blue\n*.color12:      bright_blue\n\n! magenta\n*.color5:       magenta\n*.color13:      bright_magenta\n\n! cyan\n*.color6:       cyan\n*.color14:      bright_cyan\n\n! white\n*.color7:       white\n*.color15:      bright_white\n";

/*
 * Regexes
 */

var hex = '(#[a-f0-9]{6})';

var regex = {
  color: new RegExp('\\b(foreground|background|color(\\d\\d?))\\s*:\\s*'+hex, 'ig'),
  define: new RegExp('^#define\\s*([a-z0-9_]+)\\s*'+hex+'\\s*$', 'mig'),
  comment: /^\s*!.*$/mg
};

module.exports = {


  /*
   * xresources.import
   *
   * - input (string) : text to parse
   * > colors (object)
   */

  import: function (input) {
    var output = {};
    var match, search;

    // remove comments
    input = input.replace(regex.comment, '');

    // replace #define colors
    while ((match = regex.define.exec(input)) !== null) {
      search = new RegExp(':\\s*' + match[1] + '\\b', 'g');
      input = input.replace(search, ':' + match[2]);
    }

    // match colors
    while ((match = regex.color.exec(input)) !== null) {
      // if is colorN use N else use foreground/background
      var index = match[2] ? match[2] : match[1];
      output[index] = tinycolor(match[3]);
    }

    return output;
  },

  export: createExporter(template)

};

},{"../exporter":2,"tinytinycolor":15}],11:[function(_dereq_,module,exports){
var _ = _dereq_('lodash');
var tiny = _dereq_('tinytinycolor');

tiny.prototype.toRgbArray = function () {
  var rgb = this.toRgb();
  return [ rgb.r, rgb.g, rgb.b ];
};

tiny.prototype.toSrgbArray = function () {
  return this.toRgbArray().map(function (value) {
    return value / 255;
  });
};

tiny.prototype.to12Hex = function () {
  var hex = this.toHex();
  var r = hex.slice(0, 2);
  var g = hex.slice(2, 4);
  var b = hex.slice(4, 6);
  return r + r + g + g + b + b;
};

tiny.prototype.to12HexString = function () {
  return '#' + this.to12Hex();
};

module.exports = tiny;

},{"tinytinycolor":15}],12:[function(_dereq_,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = _dereq_('base64-js')
var ieee754 = _dereq_('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str.toString()
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list[, length])')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (totalLength === undefined) {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

Buffer.compare = function (a, b) {
  assert(Buffer.isBuffer(a) && Buffer.isBuffer(b), 'Arguments must be Buffers')
  var x = a.length
  var y = b.length
  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
  if (i !== len) {
    x = a[i]
    y = b[i]
  }
  if (x < y) {
    return -1
  }
  if (y < x) {
    return 1
  }
  return 0
}

// BUFFER INSTANCE METHODS
// =======================

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function asciiWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function utf16leWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end === undefined) ? self.length : Number(end)

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = asciiSlice(self, start, end)
      break
    case 'binary':
      ret = binarySlice(self, start, end)
      break
    case 'base64':
      ret = base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

Buffer.prototype.equals = function (b) {
  assert(Buffer.isBuffer(b), 'Argument must be a Buffer')
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.compare = function (b) {
  assert(Buffer.isBuffer(b), 'Argument must be a Buffer')
  return Buffer.compare(this, b)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++) {
      target[i + target_start] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function binarySlice (buf, start, end) {
  return asciiSlice(buf, start, end)
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return readUInt16(this, offset, false, noAssert)
}

function readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return readInt16(this, offset, false, noAssert)
}

function readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return readInt32(this, offset, false, noAssert)
}

function readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return readFloat(this, offset, false, noAssert)
}

function readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
  return offset + 1
}

function writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
  return offset + 2
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  return writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  return writeUInt16(this, value, offset, false, noAssert)
}

function writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
  return offset + 4
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  return writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  return writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
  return offset + 1
}

function writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
  return offset + 2
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  return writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  return writeInt16(this, value, offset, false, noAssert)
}

function writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
  return offset + 4
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  return writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  return writeInt32(this, value, offset, false, noAssert)
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F) {
      byteArray.push(b)
    } else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++) {
        byteArray.push(parseInt(h[j], 16))
      }
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

},{"base64-js":13,"ieee754":14}],13:[function(_dereq_,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var ZERO   = '0'.charCodeAt(0)
	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	module.exports.toByteArray = b64ToByteArray
	module.exports.fromByteArray = uint8ToBase64
}())

},{}],14:[function(_dereq_,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],15:[function(_dereq_,module,exports){
// TinyTinyColor v0.0.0
// https://github.com/autopulated/TinyTinyColor
// 2013-08-10, Brian Grinstead, MIT License
// 2014, James Crosby, MIT License
//
// Like TinyColor, but even smaller (who uses named colours anyway)

(function() {

var trimLeft = /^[\s,#]+/,
    trimRight = /\s+$/,
    tinyCounter = 0,
    math = Math,
    mathRound = math.round,
    mathMin = math.min,
    mathMax = math.max;

var tinycolor = function tinycolor (color, opts) {

    color = (color) ? color : '';
    opts = opts || { };

    // If input is already a tinycolor, return itself
    if (color instanceof tinycolor) {
       return color;
    }
    // If we are called as a function, call using new instead
    if (!(this instanceof tinycolor)) {
        return new tinycolor(color, opts);
    }

    var rgb = inputToRGB(color);
    this._r = rgb.r,
    this._g = rgb.g,
    this._b = rgb.b,
    this._a = rgb.a,
    this._roundA = mathRound(100*this._a) / 100,
    this._format = opts.format || rgb.format;
    this._gradientType = opts.gradientType;

    // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
    if (this._r < 1) { this._r = mathRound(this._r); }
    if (this._g < 1) { this._g = mathRound(this._g); }
    if (this._b < 1) { this._b = mathRound(this._b); }

    this._ok = rgb.ok;
    this._tc_id = tinyCounter++;
};

tinycolor.prototype = {
    getAlpha: function() {
        return this._a;
    },
    setAlpha: function(value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100*this._a) / 100;
    },
    toHsv: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
    },
    toHsvString: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
        return (this._a == 1) ?
          "hsv("  + h + ", " + s + "%, " + v + "%)" :
          "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
    },
    toHsl: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
    },
    toHslString: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
        return (this._a == 1) ?
          "hsl("  + h + ", " + s + "%, " + l + "%)" :
          "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
    },
    toHex: function(allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
    },
    toHexString: function(allow3Char) {
        return '#' + this.toHex(allow3Char);
    },
    toHex8: function() {
        return rgbaToHex(this._r, this._g, this._b, this._a);
    },
    toHex8String: function() {
        return '#' + this.toHex8();
    },
    toRgb: function() {
        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
    },
    toRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
          "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
    },
    toFilter: function(secondColor) {
        var hex8String = '#' + rgbaToHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";

        if (secondColor) {
            var s = tinycolor(secondColor);
            secondHex8String = s.toHex8String();
        }

        return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
    }
};

// If input is an object, force 1 into "1.0" to handle ratios properly
// String input requires "1.0" as input, so 1 will be treated as 1
tinycolor.fromRatio = function(color, opts) {
    if (typeof color == "object") {
        var newColor = {};
        for (var i in color) {
            if (color.hasOwnProperty(i)) {
                if (i === "a") {
                    newColor[i] = color[i];
                }
                else {
                    newColor[i] = convertToPercentage(color[i]);
                }
            }
        }
        color = newColor;
    }

    return tinycolor(color, opts);
};

// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff000000" or "ff000000"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//
function inputToRGB(color) {

    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var ok = false;
    var format = false;

    if (typeof color == "string") {
        color = stringInputToObject(color);
    }

    if (typeof color == "object") {
        if (color.hasOwnProperty("r") && color.hasOwnProperty("g") && color.hasOwnProperty("b")) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        }
        else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("v")) {
            color.s = convertToPercentage(color.s);
            color.v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, color.s, color.v);
            ok = true;
            format = "hsv";
        }
        else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("l")) {
            color.s = convertToPercentage(color.s);
            color.l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, color.s, color.l);
            ok = true;
            format = "hsl";
        }

        if (color.hasOwnProperty("a")) {
            a = color.a;
        }
    }

    a = boundAlpha(a);

    return {
        ok: ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a: a
    };
}


// Conversion Functions
// --------------------

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

// `rgbToRgb`
// Handle bounds / percentage checking to conform to CSS color spec
// <http://www.w3.org/TR/css3-color/>
// *Assumes:* r, g, b in [0, 255] or [0, 1]
// *Returns:* { r, g, b } in [0, 255]
function rgbToRgb(r, g, b){
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
    };
}

// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
// *Returns:* { h, s, l } in [0,1]
function rgbToHsl(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return { h: h, s: s, l: l };
}

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hslToRgb(h, s, l) {
    var r, g, b;

    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);

    function hue2rgb(p, q, t) {
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    if(s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
function rgbToHsv(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max === 0 ? 0 : d / max;

    if(max == min) {
        h = 0; // achromatic
    }
    else {
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
 function hsvToRgb(h, s, v) {

    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);

    var i = math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHex`
// Converts an RGB color to hex
// Assumes r, g, and b are contained in the set [0, 255]
// Returns a 3 or 6 character hex
function rgbToHex(r, g, b, allow3Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    // Return a 3 character hex if possible
    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }

    return hex.join("");
}
    // `rgbaToHex`
    // Converts an RGBA color plus alpha transparency to hex
    // Assumes r, g, b and a are contained in the set [0, 255]
    // Returns an 8 character hex
    function rgbaToHex(r, g, b, a) {

        var hex = [
            pad2(convertDecimalToHex(a)),
            pad2(mathRound(r).toString(16)),
            pad2(mathRound(g).toString(16)),
            pad2(mathRound(b).toString(16))
        ];

        return hex.join("");
    }

// `equals`
// Can be called with any tinycolor input
tinycolor.equals = function (color1, color2) {
    if (!color1 || !color2) { return false; }
    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};


// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

tinycolor.desaturate = function (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
};
tinycolor.saturate = function (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
};
tinycolor.greyscale = function(color) {
    return tinycolor.desaturate(color, 100);
};
tinycolor.lighten = function(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
};
tinycolor.darken = function (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
};
tinycolor.complement = function(color) {
    var hsl = tinycolor(color).toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return tinycolor(hsl);
};


// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

tinycolor.triad = function(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
    ];
};
tinycolor.tetrad = function(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
    ];
};
tinycolor.splitcomplement = function(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
        tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
    ];
};
tinycolor.analogous = function(color, results, slices) {
    results = results || 6;
    slices = slices || 30;

    var hsl = tinycolor(color).toHsl();
    var part = 360 / slices;
    var ret = [tinycolor(color)];

    for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor(hsl));
    }
    return ret;
};
tinycolor.monochromatic = function(color, results) {
    results = results || 6;
    var hsv = tinycolor(color).toHsv();
    var h = hsv.h, s = hsv.s, v = hsv.v;
    var ret = [];
    var modification = 1 / results;

    while (results--) {
        ret.push(tinycolor({ h: h, s: s, v: v}));
        v = (v + modification) % 1;
    }

    return ret;
};


// Utilities
// ---------


// Return a valid alpha value [0,1] with all invalid values being set to 1
function boundAlpha(a) {
    a = parseFloat(a);

    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }

    return a;
}

// Take input from [0, n] and return it as [0, 1]
function bound01(n, max) {
    if (isOnePointZero(n)) { n = "100%"; }

    var processPercent = isPercentage(n);
    n = mathMin(max, mathMax(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
        n = parseInt(n * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if ((math.abs(n - max) < 0.000001)) {
        return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return (n % max) / parseFloat(max);
}

// Force a number between 0 and 1
function clamp01(val) {
    return mathMin(1, mathMax(0, val));
}

// Parse a base-16 hex value into a base-10 integer
function parseIntFromHex(val) {
    return parseInt(val, 16);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
}

// Check to see if string passed in is a percentage
function isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
}

// Force a hex value to have 2 characters
function pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
}

// Replace a decimal with it's percentage value
function convertToPercentage(n) {
    if (n <= 1) {
        n = (n * 100) + "%";
    }

    return n;
}

// Converts a decimal to a hex value
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
// Converts a hex value to a decimal
function convertHexToDecimal(h) {
    return (parseIntFromHex(h) / 255);
}

var matchers = (function() {

    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = "[-\\+]?\\d+%?";

    // <http://www.w3.org/TR/css3-values/#number-value>
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

    return {
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
})();

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
function stringInputToObject(color) {

    color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();

    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match;
    if ((match = matchers.rgb.exec(color))) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    if ((match = matchers.rgba.exec(color))) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    if ((match = matchers.hsl.exec(color))) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    if ((match = matchers.hsla.exec(color))) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    if ((match = matchers.hsv.exec(color))) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    if ((match = matchers.hex8.exec(color))) {
        return {
            a: convertHexToDecimal(match[1]),
            r: parseIntFromHex(match[2]),
            g: parseIntFromHex(match[3]),
            b: parseIntFromHex(match[4]),
            format: "hex8"
        };
    }
    if ((match = matchers.hex6.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: "hex"
        };
    }
    if ((match = matchers.hex3.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            format: "hex"
        };
    }

    return false;
}

// Node: Export function
if (typeof module !== "undefined" && module.exports) {
    module.exports = tinycolor;
}
// AMD/requirejs: Define the module
else if (typeof define === 'function' && define.amd) {
    define(function () {return tinycolor;});
}
// Browser: Expose to window
else {
    window.tinytinycolor = tinycolor;
}

})();

},{}],16:[function(_dereq_,module,exports){

module.exports = _dereq_('./lib/urlsafe-base64');
},{"./lib/urlsafe-base64":17}],17:[function(_dereq_,module,exports){
(function (Buffer){
/*!
 * urlsafe-base64
 * Copyright(c) 2013 RGBboy <me@rgbboy.com>
 * MIT Licensed
 */

/**
 * Module Dependencies
 */

// None yet!

/**
 * Library version.
 */

exports.version = '0.0.2';

/**
 * .encode
 *
 * return an encoded Buffer as URL Safe Base64
 *
 * Note: This function encodes to the RFC 4648 Spec where '+' is encoded 
 *       as '-' and '/' is encoded as '_'. The padding character '=' is 
 *       removed.
 *
 * @param {Buffer} buffer
 * @return {String}
 * @api public
 */

exports.encode = function encode(buffer) {

  return buffer.toString('base64')
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='

};

/**
 * .decode
 *
 * return an decoded URL Safe Base64 as Buffer
 *
 * @param {String}
 * @return {Buffer}
 * @api public
 */

exports.decode = function validate(base64) {

  // Add removed at end '='
  base64 += Array(5 - base64.length % 4).join('=');

  base64 = base64
    .replace(/\-/g, '+') // Convert '-' to '+'
    .replace(/\_/g, '/'); // Convert '_' to '/'

  return new Buffer(base64, 'base64');

};

/**
 * .validate
 *
 * Validates a string if it is URL Safe Base64 encoded.
 *
 * @param {String} 
 * @return {Boolean}
 * @api public
 */

exports.validate = function validate(base64) {

  return /^[A-Za-z0-9\-_]+$/.test(base64);

};
}).call(this,_dereq_("buffer").Buffer)
},{"buffer":12}]},{},[1])
(1)
});