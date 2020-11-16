'use strict';

var _ = require('lodash');
var fs = require('fs');
var Colr = require('colr');
var createExporter = require('../exporter');

var template = fs.readFileSync(__dirname + '/../../templates/kitty.dot', 'utf8');

/*
 * Regexes
 */

var hex = '(?:\\s*)' + // space
    '(#[a-f0-9]{6})';  // hex

var regex = {
  color: new RegExp('^(foreground|background|color(\\d{1,2}))'+hex+'$', 'mig'),
  comment: /^\s*#.*$/mg
};

var VALID_COLORS = [
  '0', '1', '2', '3', '4', '5', '6', '7',
  '8', '9', '10', '11', '12', '13', '14', '15',
  'foreground', 'background'
];

module.exports = {
  export: createExporter(template, _.partialRight(_.mapValues, function (color) {
    return color.toHex();
  })),


  /*
   * kitty.import
   *
   * - input (string) : text to parse
   * > colors (object)
   */

  import: function (input) {
    var output = {};
    var match, search;

    // remove comments
    input = input.replace(regex.comment, '');

    // match colors
    while ((match = regex.color.exec(input)) !== null) {
      // if is colorN use N else use foreground/background
      var index = match[2] ? match[2] : match[1];
      var value = match[3];

      //ignore invalid color names
      if (VALID_COLORS.indexOf(index) < 0) { continue; }

      output[index] = Colr.fromHex(value);
    }

    return output;
  }
};
