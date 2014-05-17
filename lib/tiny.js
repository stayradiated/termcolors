var _ = require('lodash');
var tiny = require('tinytinycolor');

tiny.prototype.toRgbArray = function () {
  var rgb = this.toRgb();
  return [ rgb.r, rgb.g, rgb.b ];
};

tiny.prototype.toSrgbArray = function () {
  return this.toRgbArray().map(function (value) {
    return value / 255;
  });
};

tiny.prototype.to12Hex = function () {
  var hex = this.toHex();
  var r = hex.slice(0, 2);
  var g = hex.slice(2, 4);
  var b = hex.slice(4, 6);
  return r + r + g + g + b + b;
};

tiny.prototype.to12HexString = function () {
  return '#' + this.to12Hex();
};

module.exports = tiny;
