'use strict';

var _ = require('lodash');
var fs = require('fs');
var putty = require('../../lib/formats/putty');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/putty', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/putty.txt', 'utf8');

  describe('.export', function () {

    it('should export as putty', function () {
      var actual = putty.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
