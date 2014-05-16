var _ = require('lodash');

var colors = [
  ['bg', 'background'],
  ['fg', 'foreground'],
  ['0', 0],
  ['1', 1],
  ['2', 2],
  ['3', 3],
  ['4', 4],
  ['5', 5],
  ['6', 6],
  ['7', 7],
  ['8', 8],
  ['9', 9],
  ['10', 10],
  ['11', 11],
  ['12', 12],
  ['13', 13],
  ['14', 14],
  ['15', 15]
];

var styles = [
  ['.fg-', 'color'],
  ['.bg-', 'background']
];

module.exports = {

  export : function (input) {
    return _.reduce(colors, function (output, color) {
      var name = color[0], id = color[1];
      return output + _.map(styles, function (style) {
        var prefix = style[0], attr = style[1];
        return prefix + name + '{' + 
          attr + ':' + input[id].toHexString() + ' !important;}\n';
      }).join('');
    }, '');
  }

};
