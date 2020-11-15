'use strict';

var _ = require('lodash');
var fs = require('fs');
var kitty = require('../../lib/formats/kitty');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/kitty', function () {
  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/kitty.txt', 'utf8');

  describe('.export', function () {
    it('should export as kitty', function () {
      var actual = kitty.export(COLORS);
      same(actual, OUTPUT);
    });
  });
});
