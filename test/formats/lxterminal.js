'use strict';

var _ = require('lodash');
var fs = require('fs');
var lxterminal = require('../../lib/formats/lxterminal');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/lxterminal', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/lxterminal.txt', 'utf8');

  describe('.export', function () {

    it('should export as lxterminal', function () {
      var actual = lxterminal.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
