var _ = require('lodash');
var Color = require('color');

Color.prototype.avgRgbArray = function () {
  return this.rgbArray().map(function (value) {
    return value / 255;
  });
};

Color.prototype.doubleHex = function () {
  var hex = this.hexString().slice(1);
  var r = hex.slice(0, 2);
  var g = hex.slice(2, 4);
  var b = hex.slice(4, 6);
  return r + r + g + g + b + b;
};

Color.prototype.doubleHexString = function () {
  return '#' + this.doubleHex();
};

module.exports = Color;
