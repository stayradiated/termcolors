var _ = require('lodash');
var fs = require('fs');
var konsole = require('../../lib/formats/konsole');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/konsole', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/konsole.txt', 'utf8');

  describe('.export', function () {

    it('should export as konsole', function () {
      var actual = konsole.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
