'use strict';

var _ = require('lodash');
var assert = require('chai').assert;

var convertToHex = function (colors) {
  if (_.isObject(colors)) {
    colors = _.clone(colors);
    for (var key in colors) {
      if (colors.hasOwnProperty(key) && ! _.isString(colors[key])) {
        colors[key] = colors[key].toHex();
      }
    }
    return colors;
  }
  
  if (_.isArray(colors)) {
    return _.map(colors, function (color) {
      return color.toHex();
    });
  }
  
  if (colors.toHex) { 
    return colors.toHex();
  } 

  return colors;
};

module.exports = function (expected, actual) {
  actual = convertToHex(actual);
  expected = convertToHex(expected);
  return assert.deepEqual(expected, actual);
};
