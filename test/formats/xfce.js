'use strict';

var _ = require('lodash');
var fs = require('fs');
var xfce = require('../../lib/formats/xfce');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/xfce', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/xfce.txt', 'utf8');

  describe('.export', function () {

    it('should export as xfce', function () {
      var actual = xfce.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
