'use strict';

var _ = require('lodash');
var fs = require('fs');
var yaml = require('js-yaml')
var Colr = require('colr')
var createExporter = require('../exporter');

var template = fs.readFileSync(__dirname + '/../../templates/alacritty.dot', 'utf8');

function hex (string) {
  return Colr.fromHex(string.slice(-6))
}

module.exports = {
  export: createExporter(template, _.partialRight(_.mapValues, function (color) {
    return color.toHex().slice(1);
  })),
  import: function (input) {
    var doc = yaml.safeLoad(input);
    var colors = doc.colors;
    var primary = colors.primary;
    var normal = colors.normal;
    var bright = colors.bright;

    return {
      background: hex(primary.background),
      foreground: hex(primary.foreground),
      0: hex(normal.black),
      1: hex(normal.red),
      2: hex(normal.green),
      3: hex(normal.yellow),
      4: hex(normal.blue),
      5: hex(normal.magenta),
      6: hex(normal.cyan),
      7: hex(normal.white),
      8: hex(bright.black),
      9: hex(bright.red),
      10: hex(bright.green),
      11: hex(bright.yellow),
      12: hex(bright.blue),
      13: hex(bright.magenta),
      14: hex(bright.cyan),
      15: hex(bright.white),
    }
  }
};
