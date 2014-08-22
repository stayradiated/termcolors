var _ = require('lodash');
var fs = require('fs');
var Color = require('color');
var createExporter = require('../exporter');

var template = fs.readFileSync(__dirname + '/../../templates/termite.dot', 'utf8');

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
      output[index] = Color(match[3]);
    }

    return output;
  },

  export: createExporter(template, _.partialRight(_.mapValues, function (color) {
    return color.hexString();
  }))

};
