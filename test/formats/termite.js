var fs = require('fs');
var same = require('../utils/same');
var termite = require('../../lib/formats/termite');
var defaults = require('../../lib/formats/defaults');

describe('formats/termite', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/termite.txt', 'utf8');

  describe('.import', function () {

    it('should import termite files', function () {
      var actual = termite.import(OUTPUT);
      same(actual, COLORS);
    });

  });

  describe('.export', function () {

    it('should export termite files', function () {
      var actual = termite.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
