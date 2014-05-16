var fs = require('fs');
var css = require('../lib/css');
var same = require('./utils/same');
var assert = require('chai').assert;
var defaults = require('../lib/defaults');
var tinycolor = require('../vendor/tinycolor');

describe('formats/css', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/files/defaults.css').toString();

  describe('.export', function () {

    it('should export valid css', function () {

      var output = css.export(COLORS);
      same(output, OUTPUT);

    });

  });

});
