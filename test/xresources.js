var fs = require('fs');
var assert = require('chai').assert;
var same = require('./utils/same');
var defaults = require('../lib/defaults');
var xresources = require('../lib/xresources');
var tinycolor = require('../vendor/tinycolor');

describe('formats/xresources', function () {

  var COLORS = defaults.colors;
  var OUTPUT = fs.readFileSync(__dirname + '/files/defaults.xresources').toString();

  describe('.import', function () {

    it('should parse colors 0 - 15', function () {

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

    it('should handle default color names', function () {

      var actual = xresources.import(
        'color0: black \n'+
        'color1: red \n'+
        'color2: green \n'+
        'color3: yellow \n'+
        'color4: blue \n'+
        'color5: magenta \n'+
        'color6: cyan \n'+
        'color7: white \n'
      );

      var expected = {
        0: '#000000',
        1: '#cc0403',
        2: '#19cb00',
        3: '#cecb00',
        4: '#001cd1',
        5: '#cb1ed1',
        6: '#0dcdcd',
        7: '#e5e5e5'
      };

      same(actual, expected);

    });

  });

  describe('.export', function () {

    it('should export as a valid Xresources file', function () {

      var output = xresources.export(defaults.colors);
      same(output, OUTPUT);

    });

  });

});
