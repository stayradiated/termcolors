var fs = require('fs');
var same = require('./utils/same');
var mintty = require('../lib/mintty');
var defaults = require('../lib/defaults');

describe('formats/mintty', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/files/defaults.mintty').toString();

  describe('.export', function () {
    var actual = mintty.export(COLORS);
    same(actual, OUTPUT);
  });

});
