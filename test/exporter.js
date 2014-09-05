'use strict';

var Colr = require('colr');
var assert = require('chai').assert;
var exporter = require('../lib/exporter');

describe('exporter', function () {

  it('should support hex', function () {
    var template = '{{=c.background.toHex()}}';
    var fn = exporter(template);
    var result = fn({background: Colr.fromHex('#000')});
    assert.equal(result, '#000000');
  });

  it('should support rgb', function () {
    var template = '{{=c.background.toRgbArray().join(",")}}';
    var fn = exporter(template);
    var result = fn({background: Colr.fromHex('#0080ff')});
    assert.equal(result, '0,128,255');
  });

  it('should support double hex', function () {
    var template = '{{=c.background.toDoubleHex()}}';
    var fn = exporter(template);
    var result = fn({background: Colr.fromHex('#aabbcc')});
    assert.equal(result, '#aaaabbbbcccc');
  });

  it('should support averaged rgb', function () {
    var template = '{{=c.background.toAvgRgbArray().join(",")}}';
    var fn = exporter(template);
    var result = fn({background: Colr.fromHex('#0080ff')});
    assert.equal(result, '0,0.5019607843137255,1');
  });

});
