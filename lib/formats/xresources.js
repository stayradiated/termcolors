var _ = require('lodash');
var fs = require('fs');
var tiny = require('tinytinycolor');
var createExporter = require('../exporter');

var template = fs.readFileSync(__dirname + '/../../templates/xresources.dot', 'utf8');

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
      output[index] = tiny(match[3]);
    }

    return output;
  },

  export: createExporter(template, _.partialRight(_.mapValues, function (color) {
    return color.toHexString();
  }))

};
