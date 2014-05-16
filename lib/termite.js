var _ = require('lodash');
var tinycolor = require('../vendor/tiny');

var regex = {
  color: /(foreground|background|color(\d\d?))\s*=\s*(#[a-f0-9]{6})/gi,
  comment: /^\s*#.*$/mg
};

var colors = {
  special: ['background', 'foreground'],
  black: [0, 8],
  red: [1, 9],
  green: [2, 10],
  yellow: [3, 11],
  blue: [4, 12],
  magenta: [5, 13],
  cyan: [6, 14],
  white: [7, 15],
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
      output[index] = tinycolor(match[3]);
    }

    return output;
  },

  export: function (input) {
    return _.reduce(colors, function (output, ids, name) {
      var comment = '\n# ' + name + '\n';
      var colors =_.map(ids, function (id) { 
        var name = _.isNumber(id) ? 'color' + id : id;
        return name + ' = ' + input[id].toHexString() + '\n';
      }).join('');
      return output + comment + colors;
    }, '');
  }

};
