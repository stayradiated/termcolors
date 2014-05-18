var _ = require('lodash');
var fs = require('fs');
var gnome = require('../../lib/formats/gnome');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/gnome', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/gnome.txt', 'utf8');

  describe('.export', function () {

    it('should export as gnome', function () {
      var actual = gnome.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
