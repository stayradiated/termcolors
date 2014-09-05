'use strict';

var _ = require('lodash');
var fs = require('fs');
var guake = require('../../lib/formats/guake');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/guake', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/guake.txt', 'utf8');

  describe('.export', function () {

    it('should export as guake', function () {
      var actual = guake.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
