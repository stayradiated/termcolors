var _ = require('lodash');
var fs = require('fs');
var css = require('../../lib/formats/css');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/css', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/css.txt', 'utf8');

  describe('.export', function () {

    it('should export as css', function () {
      var actual = css.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
