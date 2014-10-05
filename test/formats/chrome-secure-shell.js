'use strict';

var _ = require('lodash');
var fs = require('fs');
var chromeshell = require('../../lib/formats/chrome-secure-shell');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/chrome-secure-shell', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/chromeshell.txt', 'utf8');

  describe('.export', function () {

    it('should export as chrome-secure-shell', function () {
      var actual = chromeshell.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
