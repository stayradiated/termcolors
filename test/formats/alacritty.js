'use strict';

var _ = require('lodash');
var fs = require('fs');
var alacritty = require('../../lib/formats/alacritty');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/alacritty', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/alacritty.txt', 'utf8');

  describe('.export', function () {

    it('should export as alacritty', function () {
      var actual = alacritty.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
