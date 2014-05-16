var _ = require('lodash');

var colors = {
  Background: 'background',
  Foreground: 'foreground',
  Cursor: 'foreground',
  Palette0: 0,
  Palette1: 1,
  Palette2: 2,
  Palette3: 3,
  Palette4: 4,
  Palette5: 5,
  Palette6: 6,
  Palette7: 7,
  Palette8: 8,
  Palette9: 9,
  Palette10: 10,
  Palette11: 11,
  Palette12: 12,
  Palette13: 13,
  Palette14: 14,
  Palette15: 15,
};

module.exports = {

  import: function () {
  },

  export: function (input) {
    return _.reduce(colors, function (last, id, name) {
      return last + 'Color' + name + '=' + input[id].toHexString() + '\n';
    }, '[Configuration]\n');
  }

};
