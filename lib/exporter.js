'use strict';

var _ = require('lodash');
var dot = require('dot');

// load colr extensions
require('./colr');

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

var createExporter = function (template, iterator) {
  iterator = iterator || _.identity;
  template = dot.template(template, dotOptions);
  return function (colors) {
    return template(iterator(colors));
  };
};

module.exports = createExporter;
