var _ = require('lodash');
var fs = require('fs');
var Colr = require('colr');
var createExporter = require('../exporter');

var template = fs.readFileSync(__dirname + '/../../templates/xresources.dot', 'utf8');

/*
 * Regexes
 */

var hex = '(?:\\[\\d*\\])?\\s*(#[a-f0-9]{6})';

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
      output[index] = Colr.fromHex(match[3]);
    }

    return output;
  },

  export: createExporter(template, _.partialRight(_.mapValues, function (color) {
    return color.toHex();
  }))

};
