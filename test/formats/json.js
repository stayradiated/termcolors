'use strict';

var _ = require('lodash');
var fs = require('fs');
var json = require('../../lib/formats/json');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/json', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/json.txt', 'utf8');

  describe('.import', function () {

    it('should import as json', function () {
      var actual = json.import(OUTPUT);
      same(actual, COLORS);
    });

  });

  describe('.export', function () {

    it('should export as json', function () {
      var actual = json.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
