var tiny = require('tinytinycolor');
var assert = require('chai').assert;
var exporter = require('../lib/exporter');

describe('exporter', function () {

  it('should support hex', function () {
    var template = '{{=c.background.toHexString()}}';
    var fn = exporter(template);
    var result = fn({background: tiny('#000')});
    assert.equal(result, '#000000');
  });

  it('should support rgb', function () {
    var template = '{{=c.background.toRgbArray().join(",")}}';
    var fn = exporter(template);
    var result = fn({background: tiny('#0080ff')});
    assert.equal(result, '0,128,255');
  });

  it('should support double hex', function () {
    var template = '{{=c.background.to12HexString()}}';
    var fn = exporter(template);
    var result = fn({background: tiny('#aabbcc')});
    assert.equal(result, '#aaaabbbbcccc');
  });

  it('should support srgb', function () {
    var template = '{{=c.background.toSrgbArray().join(",")}}';
    var fn = exporter(template);
    var result = fn({background: tiny('#0080ff')});
    assert.equal(result, '0,0.5019607843137255,1');
  });

});
