var _ = require('lodash');
var url = require('../lib/url');
var same = require('./utils/same');
var assert = require('chai').assert;
var defaults = require('../lib/defaults');

describe('formats/url', function () {

  var COLORS = defaults.colors;
  var OUTPUT = 'AAAA____AAAAzAQDGcsAzssAABzRyx7RDc3N5eXlTU1NPgYFI_0A__0AACb__Sj_FP______';

  describe('.import', function () {

    it('should import from a string', function () {
      var actual = url.import(OUTPUT);
      same(actual, COLORS);
    });

  });

  describe('.export', function () {

    it('should export as a url_base64 string', function () {
      var output = url.export(COLORS);
      assert.equal(output, OUTPUT);
    });

  });

});
