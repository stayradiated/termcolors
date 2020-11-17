'use strict';

var _ = require('lodash');
var fs = require('fs');
var urxvt = require('../../lib/formats/urxvt');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/urxvt', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/urxvt.txt', 'utf8');

  describe('.export', function () {

    it('should export as urxvt', function () {
      var actual = urxvt.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
