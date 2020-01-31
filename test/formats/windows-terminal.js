'use strict';

var _ = require('lodash');
var fs = require('fs');
var wt = require('../../lib/formats/windows-terminal');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/wt', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/windows-terminal.txt', 'utf8');

  describe('.export', function () {

    it('should export as windows-terminal', function () {
      var actual = wt.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
