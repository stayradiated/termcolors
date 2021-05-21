'use strict';

var _ = require('lodash');
var fs = require('fs');
var yaml = require('js-yaml')
var Colr = require('colr')
var createExporter = require('../exporter');

var template = fs.readFileSync(__dirname + '/../../templates/alacritty.dot', 'utf8');

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
      background: Colr.fromHex(primary.background),
      foreground: Colr.fromHex(primary.foreground),
      0: Colr.fromHex(normal.black),
      1: Colr.fromHex(normal.red),
      2: Colr.fromHex(normal.green),
      3: Colr.fromHex(normal.yellow),
      4: Colr.fromHex(normal.blue),
      5: Colr.fromHex(normal.magenta),
      6: Colr.fromHex(normal.cyan),
      7: Colr.fromHex(normal.white),
      8: Colr.fromHex(bright.black),
      9: Colr.fromHex(bright.red),
      10: Colr.fromHex(bright.green),
      11: Colr.fromHex(bright.yellow),
      12: Colr.fromHex(bright.blue),
      13: Colr.fromHex(bright.magenta),
      14: Colr.fromHex(bright.cyan),
      15: Colr.fromHex(bright.white),
    }
  }
};
