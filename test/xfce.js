var fs = require('fs');
var xfce = require('../lib/xfce');
var same = require('./utils/same');
var defaults = require('../lib/defaults');

describe('formats/xfce', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/files/defaults.xfce').toString();

  describe('.export', function () {

    it('should export as xfce config', function () {
      var actual = xfce.export(COLORS);
      same(actual, OUTPUT);
    });

  });

});
