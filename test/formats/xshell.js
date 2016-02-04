'use strict';

var _ = require('lodash');
var fs = require('fs');
var xshell = require('../../lib/formats/xshell');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/xshell', function () {

    var COLORS = defaults.colors;
    var OUTPUT = fs.readFileSync(__dirname + '/../../examples/xshell.txt', 'utf8');

    describe('.export', function () {

        it('should export as xshell', function () {
            var actual = xshell.export(COLORS);
            same(actual, OUTPUT);
        });

    });

});
