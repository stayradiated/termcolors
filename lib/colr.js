var _ = require('lodash');
var Colr = require('colr');

Colr.prototype.toAvgRgbArray = function () {
  return this.toRgbArray().map(function (value) {
    return value / 255;
  });
};

Colr.prototype.toDoubleHex = function () {
  var hex = this.toHex().slice(1);
  var r = hex.slice(0, 2);
  var g = hex.slice(2, 4);
  var b = hex.slice(4, 6);
  return '#' + r + r + g + g + b + b;
};

module.exports = Colr;
