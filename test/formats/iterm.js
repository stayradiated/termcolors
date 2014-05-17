var _ = require('lodash');
var fs = require('fs');
var same = require('../utils/same');
var iterm = require('../../lib/formats/iterm');
var assert = require('chai').assert;
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

});
