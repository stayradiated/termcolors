'use strict';

var _ = require('lodash');
var fs = require('fs');
var textmate = require('../../lib/formats/textmate');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/textmate', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/textmate.txt', 'utf8');

  describe('.export', function () {

    it('should export as textmate', function () {
      var actual = textmate.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
