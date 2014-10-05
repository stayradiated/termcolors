'use strict';

var _ = require('lodash');
var fs = require('fs');
var createExporter = require('../exporter');

var template = fs.readFileSync(__dirname + '/../../templates/chrome-secure-shell.dot', 'utf8');

module.exports = {

  export: createExporter(template, function (colors) {
    var scheme = _.mapValues(colors, function (color) {
      return color.toHex();
    });

    var bg = colors.background.toRgbArray();
    scheme.backgroundR = bg[0];
    scheme.backgroundG = bg[1];
    scheme.backgroundB = bg[2];

    var fg = colors.foreground.toRgbArray();
    scheme.foregroundR = fg[0];
    scheme.foregroundG = fg[1];
    scheme.foregroundB = fg[2];

    return scheme;
  }),

};
