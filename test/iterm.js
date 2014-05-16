var _ = require('lodash');
var assert = require('chai').assert;
var iterm = require('../lib/iterm');
var defaults = require('../lib/defaults');
var fs = require('fs');
var same = require('./utils/same');

describe('formats/iterm', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/files/defaults.itermcolors').toString();

  describe('.import', function () {

    it('should parse iterm config as XML', function () {
      var output = iterm.import(OUTPUT);
      same(output, COLORS);
    });

  });

  describe('.export', function () {

    it('should export as XML', function () {
      var output = iterm.export(defaults.colors);
      assert.equal(output, OUTPUT);
    });

  });

});
