var Color = require('color');
var assert = require('chai').assert;
var exporter = require('../lib/exporter');

describe('exporter', function () {

  it('should support hex', function () {
    var template = '{{=c.background.hexString()}}';
    var fn = exporter(template);
    var result = fn({background: Color('#000')});
    assert.equal(result, '#000000');
  });

  it('should support rgb', function () {
    var template = '{{=c.background.rgbArray().join(",")}}';
    var fn = exporter(template);
    var result = fn({background: Color('#0080ff')});
    assert.equal(result, '0,128,255');
  });

  it('should support double hex', function () {
    var template = '{{=c.background.doubleHexString()}}';
    var fn = exporter(template);
    var result = fn({background: Color('#aabbcc')});
    assert.equal(result, '#AAAABBBBCCCC');
  });

  it('should support averaged rgb', function () {
    var template = '{{=c.background.avgRgbArray().join(",")}}';
    var fn = exporter(template);
    var result = fn({background: Color('#0080ff')});
    assert.equal(result, '0,0.5019607843137255,1');
  });

});
