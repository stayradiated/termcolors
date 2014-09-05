'use strict';

var _ = require('lodash');
var fs = require('fs');
var terminator = require('../../lib/formats/terminator');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/terminator', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/terminator.txt', 'utf8');

  describe('.export', function () {

    it('should export as terminator', function () {
      var actual = terminator.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
