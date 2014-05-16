var tinycolor = require('./tinycolor');

tinycolor.prototype.toRgbArray = function () {
  var rgb = this.toRgb();
  return [ rgb.r, rgb.g, rgb.b ];
};

module.exports = tinycolor;
