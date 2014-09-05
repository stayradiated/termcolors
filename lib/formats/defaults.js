'use strict';

var _ = require('lodash');
var Colr = require('colr');

var defaultColors = _.mapValues({
  0: '#000000',
  1: '#cc0403',
  2: '#19cb00',
  3: '#cecb00',
  4: '#001cd1',
  5: '#cb1ed1',
  6: '#0dcdcd',
  7: '#e5e5e5',
  8: '#4d4d4d',
  9: '#3e0605',
  10: '#23fd00',
  11: '#fffd00',
  12: '#0026ff',
  13: '#fd28ff',
  14: '#14ffff',
  15: '#ffffff',
  background: '#000000',
  foreground: '#ffffff'
}, Colr.fromHex);

module.exports = {

  fill: function (colors) {
    return _.defaults(colors, defaultColors);
  },

  colors: defaultColors

};
