var _ = require('lodash');
var fs = require('fs');
var same = require('../utils/same');
var iterm = require('../../lib/formats/iterm');
var defaults = require('../../lib/formats/defaults');

describe('formats/iterm', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/iterm.txt', 'utf8');

  describe('.import', function () {

    it('should parse iterm config as XML', function () {
      var output = iterm.import(OUTPUT);
      same(output, COLORS);
    });

  });

  describe('.expect', function () {

    it('should export iterm config as XML', function () {
      var output = iterm.export(COLORS);
      same(output, OUTPUT);
    });

  });

});
