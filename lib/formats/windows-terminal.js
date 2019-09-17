'use strict';

var _ = require('lodash');
var fs = require('fs');
var Colr = require('colr');
var createExporter = require('../exporter');

var colorKeysMapping = {
  "0": "black",
  "1": "red",
  "2": "green",
  "3": "yellow",
  "4": "blue",
  "5": "purple",
  "6": "cyan",
  "7": "white",
  "8": "brightBlack",
  "9": "brightRed",
  "10": "brightGreen",
  "11": "brightYellow",
  "12": "brightBlue",
  "13": "brightPurple",
  "14": "brightCyan",
  "15": "brightWhite",
  "background": "background",
  "foreground": "foreground",
};

module.exports = {

  import: function (input) {
    var output = {};

    try {
      input = JSON.parse(input);
    } catch (e) {
      return output;
    }

    var mappedColors = _.mapKeys(input, function(val, key) {
      return _.invert(colorKeysMapping)[key];
    });

    return _.mapValues(mappedColors, function (string) {
      return Colr.fromHex(string);
    });
  },

  export: function (colors) {
    var parsed = _.mapKeys(colors, function(val, key) {
      return colorKeysMapping[key];
    });

    var exported = _.mapValues(parsed, function (color) {
      return color.toHex();
    });

    return JSON.stringify(exported, null, 2);
  },

};
