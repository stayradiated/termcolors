'use strict';

var _ = require('lodash');
var fs = require('fs');
var Colr = require('colr');
var createExporter = require('../exporter');

var template = fs.readFileSync(__dirname + '/../../templates/xresources.dot', 'utf8');

/*
 * Regexes
 */

var hex = '(?:' +
  '\\[\\d*\\])?' + // opacity
  '\\s*' + // space
  '(' +
    '#[a-f0-9]{6}' + // hex
  '|' + // or
    'rgb:[a-f0-9]{1,2}\/[a-f[0-9]{1,2}\/[a-f0-9]{1,2}' + // rgb
  ')';

var regex = {
  color: new RegExp('\\b(foreground|background|color(\\d\\d?))\\s*:\\s*'+hex, 'ig'),
  define: new RegExp('^#define\\s*([a-z0-9_]+)\\s*'+hex+'\\s*$', 'mig'),
  comment: /^\s*!.*$/mg
};

var DEFAULT_COLORS = '\n' +
  '#define black   #000000\n' +
  '#define red     #CC0403\n' +
  '#define green   #19CB00\n' +
  '#define yellow  #CECB00\n' +
  '#define blue    #001CD1\n' +
  '#define magenta #CB1ED1\n' +
  '#define cyan    #0DCDCD\n' +
  '#define white   #E5E5E5\n';

var VALID_COLORS = [
  '0', '1', '2', '3', '4', '5', '6', '7',
  '8', '9', '10', '11', '12', '13', '14', '15',
  'foreground', 'background'
];

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

    // add default colors
    input += DEFAULT_COLORS;

    // replace #define colors
    while ((match = regex.define.exec(input)) !== null) {
      search = new RegExp(':\\s*' + match[1] + '\\b', 'g');
      input = input.replace(search, ':' + match[2]);
    }

    // match colors
    while ((match = regex.color.exec(input)) !== null) {
      // if is colorN use N else use foreground/background
      var index = match[2] ? match[2] : match[1];
      var value = match[3];

      // ignore invalid color names
      if (VALID_COLORS.indexOf(index) < 0) { continue; }

      if (value.substring(0, 4) === 'rgb:') {
        var values = value.substring(4).split('/');
        for (var i = 0 ; i < 3; i += 1) {
          if (values[i].length === 1) {
            values[i] = values[i] + values[i];
          }
        }
        value = values.join('');
      }

      output[index] = Colr.fromHex(value);
    }

    return output;
  },

  export: createExporter(template, _.partialRight(_.mapValues, function (color) {
    return color.toHex();
  }))

};
