var _ = require('lodash');
var dot = require('dot');
var tiny = require('./tiny');

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
