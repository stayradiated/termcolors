'use strict';

var _ = require('lodash');
var fs = require('fs');
var wal = require('../../lib/formats/wal');
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');

describe('formats/wal', function () {

	var COLORS = defaults.colors;
	var OUTPUT = fs.readFileSync(__dirname + '/../../examples/wal.txt', 'utf8');

	describe('.export', function () {

		it('should export as wal', function () {
			var actual = wal.export(COLORS);
			same(actual, OUTPUT);
		});

	});

});
