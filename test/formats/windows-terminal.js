'use strict';

var _ = require('lodash');
var fs = require('fs');
var windowsTerminal = require('../../lib/formats/windows-terminal');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/windows-terminal', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/windows-terminal.txt', 'utf8');

  describe('.import', function () {

    it('should import from a windows terminal color profile', function () {
      var actual = windowsTerminal.import(OUTPUT);
      same(actual, COLORS);
    });

  });

  describe('.export', function () {

    it('should export as windows terminal color profile', function () {
      var actual = windowsTerminal.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
