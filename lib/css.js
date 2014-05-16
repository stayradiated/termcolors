var _ = require('lodash');
var tinycolor = require('../vendor/tinycolor');

module.exports = {

  export : function (input) {
    var css = {
      '.bg-bg': { background: input.background.toHexString() },
      '.fg-bg': { color: input.background.toHexString() },
      '.bg-fg': { background: input.foreground.toHexString() },
      '.fg-fg': { color: input.foreground.toHexString() }
    };

    for (var i = 0; i < 16; i++) {
      css['.fg-' + i] = { color: input[i].toHexString() };
      css['.bg-' + i] = { background: input[i].toHexString() };
    }

    return _.reduce(css, function (output, styles, selector) {
      output += selector + '{';
      output += _.reduce(styles, function (string, value, key) {
        return string + key + ':' + value + ' !important;';
      }, '');
      output += '}\n';
      return output;
    }, '');
  }

};
