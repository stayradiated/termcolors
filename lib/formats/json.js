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

    return _.mapValues(colors, function (string) {
      return Colr.fromHex(string);
    });
  },

  export: function (colors) {

    colors = _.mapValues(colors, function (color) {
      return color.toHex();
    });

    return JSON.stringify(colors, null, 2);
  },

};
