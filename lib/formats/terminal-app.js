'use strict';

var _ = require('lodash');
var fs = require('fs');
var createExporter = require('../exporter');

var template = fs.readFileSync(__dirname + '/../../templates/terminal-app.dot', 'utf8');

var code = [
  new Buffer('62706c6973743030d40102030405061516582476657273696f6e58246f626a65637473592461726368697665725424746f7012000186a0a307080f55246e756c6cd3090a0b0c0d0e554e535247425c4e53436f6c6f7253706163655624636c6173734f1027', 'hex'),
  new Buffer('0010018002d2101112135a24636c6173736e616d655824636c6173736573574e53436f6c6f72a21214584e534f626a6563745f100f4e534b657965644172636869766572d1171854726f6f74800108111a232d32373b41484e5b628c8e9095a0a9b1b4bdcfd2d700000000000001010000000000000019000000000000000000000000000000d9', 'hex')
];

module.exports = {

  export: createExporter(template, _.partialRight(_.mapValues, function (color) {
    var srgb = color.toAvgRgbArray();
    srgb = srgb.map(function (n) {
      return n.toFixed(10).toString();
    }).join(' ');
    var output = code[0].toString('binary') + srgb + code[1].toString('binary');
    output = (new Buffer(output, 'binary')).toString('base64');
    return output.match(/.{1,68}/g).join('\n\t');
  }))

};
