var fs = require('fs');
var assert = require('chai').assert;
var same = require('../utils/same');
var defaults = require('../../lib/formats/defaults');
var xresources = require('../../lib/formats/xresources');

describe('formats/xresources', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/../../examples/xresources.txt', 'utf8');

  describe('.import', function () {

    it('should parse configuration', function () {

      var actual = xresources.import(OUTPUT);
      same(actual, COLORS);

    });

    it('should parse foreground and background colors', function () {

      var actual = xresources.import(
        'background: #bada55 \n'+
        'foreground: #c0ffee \n'
      );

      var expected = {
        background: '#bada55',
        foreground: '#c0ffee'
      };

      same(actual, expected);

    });

    it('should parse different prefixes', function () {

      var actual = xresources.import(
        'color0:        #012345 \n'+
        '.color1:       #123456 \n'+
        '*color2:       #234567 \n'+
        'urxvt.color3:  #345678 \n'+
        'urxvt*color4:  #456789 \n'+
        'URxvt.color5:  #56789a \n'+
        'URxvt*color6:  #6789ab \n'
      );

      var expected = {
        0:  '#012345',
        1:  '#123456',
        2:  '#234567',
        3:  '#345678',
        4:  '#456789',
        5:  '#56789a',
        6:  '#6789ab',
      };

      same(actual, expected);

    });

    it('should replace definitions', function () {

      var actual = xresources.import(
        '#define red #ff0000 \n'+
        '#define green #00ff00 \n'+
        '#define yellow #00ffff \n'+
        'color1: red \n' +
        'color2: green \n' +
        'color3: yellow \n' +
        'color4: missing \n' +
        'color9: red \n'
      );

      var expected = {
        1: '#ff0000',
        2: '#00ff00',
        3: '#00ffff',
        9: '#ff0000'
      };

      same(actual, expected);

    });

    it('should ignore comments', function () {

      var actual = xresources.import(
        'color1: #ff0000 \n'+
        '! color1: #000000 \n'
      );

      var expected = {
        1: '#ff0000'
      };

      same(actual, expected);

    });

    it('should only ignore partial words', function () {

      var actual = xresources.import(
        'color2: #ff0000 \n'+
        'cursorColor2: #000000 \n'
      );

      var expected = {
        2: '#ff0000'
      };

      same(actual, expected);

    });

    it('should replace definitions properly', function () {
      var actual = xresources.import(
        '#define x  #aaaaaa \n'+
        '#define xx #bbbbbb \n'+
        '#define background #cccccc \n'+
        '*.background: background \n'+
        '*.color0: x \n'+
        '*.color1: xx \n'
      );

      var expected = {
        0: '#aaaaaa',
        1: '#bbbbbb',
        background: '#cccccc'
      };

      same(actual, expected);

    });

  });

});
