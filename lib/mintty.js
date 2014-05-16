var _ = require('lodash');

var colors = {
  BackgroundColour: 'background',
  ForegroundColour: 'foreground',
  CursorColour: 'foreground',
  Black: 0,
  BoldBlack: 8,
  Red: 1,
  BoldRed: 9,
  Green: 2,
  BoldGreen: 10,
  Yellow: 3,
  BoldYellow: 11,
  Blue: 4,
  BoldBlue: 12,
  Magenta: 5,
  BoldMagenta: 13,
  Cyan: 6,
  BoldCyan: 14,
  White: 7,
  BoldWhite: 15
};

module.exports = {

  import: function () {
  },

  export: function (input) {
    return _.reduce(colors, function (last, id, name) {
      return last + name + '=' + input[id].toRgbArray().join() + '\n';
    }, '');
  }

};
