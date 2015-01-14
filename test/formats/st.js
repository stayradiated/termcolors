'use strict';

var _ = require('lodash');
var fs = require('fs');
var st = require('../../lib/formats/st');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/st', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/st.txt', 'utf8');

  describe('.export', function () {

    it('should export as st', function () {
      var actual = st.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
