'use strict';

var _ = require('lodash');
var fs = require('fs');
var winterminal = require('../../lib/formats/winterminal');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/winterminal', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/winterminal.txt', 'utf8');

  describe('.import', function () {

    it('should import as winterminal', function () {
      var actual = winterminal.import(OUTPUT);
      same(actual, COLORS);
    });

  });

  describe('.export', function () {

    it('should export as winterminal', function () {
      var actual = winterminal.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
