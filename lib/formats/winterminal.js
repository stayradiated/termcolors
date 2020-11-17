'use strict';

var _ = require('lodash');
var fs = require('fs');
var Colr = require('colr');
var createExporter = require('../exporter');

module.exports = {

  import: function (input) {
    var output = {};
    var colors;

    try {
      colors = JSON.parse(input);
    } catch (e) {
      return output;
    }

    colors = {
      "foreground": colors.foreground,
      "background": colors.background,
      "0": colors.black,
      "1": colors.red,
      "2": colors.green,
      "3": colors.yellow,
      "4": colors.blue,
      "5": colors.purple,
      "6": colors.cyan,
      "7": colors.white,
      "8": colors.brightBlack,
      "9": colors.brightRed,
      "10": colors.brightGreen,
      "11": colors.brightYellow,
      "12": colors.brightBlue,
      "13": colors.brightPurple,
      "14": colors.brightCyan,
      "15": colors.brightWhite,
    };

    colors = _.mapValues(colors, function (string) {
      return Colr.fromHex(string);
    });

    return colors;
  },

  export: function (colors) {
    colors = _.mapValues(colors, function (color) {
      return color.toHex();
    });

    var output = {
      "name": "terminal.sexy",
      "foreground": colors.foreground,
      "background": colors.background,
      "black": colors["0"],
      "red": colors["1"],
      "green": colors["2"],
      "yellow": colors["3"],
      "blue": colors["4"],
      "purple": colors["5"],
      "cyan": colors["6"],
      "white": colors["7"],
      "brightBlack": colors["8"],
      "brightRed": colors["9"],
      "brightGreen": colors["10"],
      "brightYellow": colors["11"],
      "brightBlue": colors["12"],
      "brightPurple": colors["13"],
      "brightCyan": colors["14"],
      "brightWhite": colors["15"],
    };

    return JSON.stringify(output, null, 4);
  },

};
