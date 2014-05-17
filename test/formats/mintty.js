var _ = require('lodash');
var fs = require('fs');
var mintty = require('../../lib/formats/mintty');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/mintty', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/mintty.txt', 'utf8');

  describe('.export', function () {

    it('should export as a mintty config', function () {
      var actual = mintty.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
