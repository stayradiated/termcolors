'use strict';

var _ = require('lodash');
var fs = require('fs');
var createExporter = require('../exporter');

var template = fs.readFileSync(__dirname + '/../../templates/kitty.dot', 'utf8');

module.exports = {

  export: createExporter(template, _.partialRight(_.mapValues, function (color) {
    return color.toHex();
  }))

};
