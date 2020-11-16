'use strict';

var _ = require('lodash');
var fs = require('fs');
var tilix = require('../../lib/formats/tilix');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/tilix', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/tilix.txt', 'utf8');

  describe('.export', function () {

    it('should export as tilix', function () {
      var actual = tilix.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
