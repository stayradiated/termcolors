'use strict';

var _ = require('lodash');
var fs = require('fs');
var linux = require('../../lib/formats/linux');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/linux', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/linux.txt', 'utf8');

  describe('.export', function () {

    it('should export as a shell script', function () {
      var actual = linux.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
