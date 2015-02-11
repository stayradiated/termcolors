'use strict';

var _ = require('lodash');
var fs = require('fs');
var Colr = require('colr');
var createExporter = require('../exporter');

var template = fs.readFileSync(__dirname + '/../../templates/terminal-app.dot', 'utf8');

var code = [
  new Buffer('62706c6973743030d40102030405061516582476657273696f6e58246f626a65637473592461726368697665725424746f7012000186a0a307080f55246e756c6cd3090a0b0c0d0e554e535247425c4e53436f6c6f7253706163655624636c6173734f1027', 'hex'),
  new Buffer('0010018002d2101112135a24636c6173736e616d655824636c6173736573574e53436f6c6f72a21214584e534f626a6563745f100f4e534b657965644172636869766572d1171854726f6f74800108111a232d32373b41484e5b628c8e9095a0a9b1b4bdcfd2d700000000000001010000000000000019000000000000000000000000000000d9', 'hex')
];

module.exports = {

  import: function (input) {

    var keyRegex = /<key>(?:ANSI)?(\w+)Color<\/key>/g;
    var dataRegex = /<data>\s*([A-Za-z0-9+=\s]+)\s*<\/data>/g;
    var numPreRegex = /class\w/;
    var numRegex = /(?:\d\.\d+|0|1)/g;

    var map = {
      'Black':          0,
      'Red':            1,
      'Green':          2,
      'Yellow':         3,
      'Blue':           4,
      'Magenta':        5,
      'Cyan':           6,
      'White':          7,
      'BrightBlack':    8,
      'BrightRed':      9,
      'BrightGreen':    10,
      'BrightYellow':   11,
      'BrightBlue':     12,
      'BrightMagenta':  13,
      'BrightCyan':     14,
      'BrightWhite':    15,
      'Text':           'foreground',
      'Background':     'background',
    };

    var output = {};

    var group;
    while ((group = keyRegex.exec(input)) !== null) {
      var id = group[1];

      if (! map.hasOwnProperty(id)) {
        continue;
      }

      dataRegex.lastIndex = group.index;

      if ((group = dataRegex.exec(input)) !== null) {
        var data = group[1].replace(/\s+/g, '');

        var buffer = new Buffer(data, 'base64');
        var raw = buffer.toString()

        var start = raw.match(numPreRegex);

        if (start == null) {
          console.log(buffer.toString('hex'));
        }

        numRegex.lastIndex = start.index;

        var rgb = [];
        while ((group = numRegex.exec(raw)) !== null) {
          rgb.push(parseFloat(group[0], 10));
        }

        output[map[id]] = Colr.fromAvgRgbArray(rgb);
      }
    }

    return output;
  },

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
