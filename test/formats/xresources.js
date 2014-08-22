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
        'background: #BADA55 \n'+
        'foreground: #C0FFEE \n'
      );

      var expected = {
        background: '#BADA55',
        foreground: '#C0FFEE'
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
        'URxvt.color5:  #56789A \n'+
        'URxvt*color6:  #6789AB \n'
      );

      var expected = {
        0:  '#012345',
        1:  '#123456',
        2:  '#234567',
        3:  '#345678',
        4:  '#456789',
        5:  '#56789A',
        6:  '#6789AB',
      };

      same(actual, expected);

    });

    it('should replace definitions', function () {

      var actual = xresources.import(
        '#define red #FF0000 \n'+
        '#define green #00FF00 \n'+
        '#define yellow #00FFFF \n'+
        'color1: red \n' +
        'color2: green \n' +
        'color3: yellow \n' +
        'color4: missing \n' +
        'color9: red \n'
      );

      var expected = {
        1: '#FF0000',
        2: '#00FF00',
        3: '#00FFFF',
        9: '#FF0000'
      };

      same(actual, expected);

    });

    it('should ignore comments', function () {

      var actual = xresources.import(
        'color1: #FF0000 \n'+
        '! color1: #000000 \n'
      );

      var expected = {
        1: '#FF0000'
      };

      same(actual, expected);

    });

    it('should only ignore partial words', function () {

      var actual = xresources.import(
        'color2: #FF0000 \n'+
        'cursorColor2: #000000 \n'
      );

      var expected = {
        2: '#FF0000'
      };

      same(actual, expected);

    });

    it('should replace definitions properly', function () {
      var actual = xresources.import(
        '#define x  #AAAAAA \n'+
        '#define xx #BBBBBB \n'+
        '#define background #CCCCCC \n'+
        '*.background: background \n'+
        '*.color0: x \n'+
        '*.color1: xx \n'
      );

      var expected = {
        0: '#AAAAAA',
        1: '#BBBBBB',
        background: '#CCCCCC'
      };

      same(actual, expected);

    });

    it('should ignore opacity', function () {
      var actual = xresources.import(
        'background: [20] #AAAAAA \n'+
        'foreground:[90]#CCCCCC \n'+
        'urxvt.color0: [100]#123000'
      );

      var expected = {
        background: '#AAAAAA',
        foreground: '#CCCCCC',
        0: '#123000'
      };

      same(actual, expected);
    });

  });

});
