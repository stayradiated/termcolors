var _ = require('lodash');
var fs = require('fs');
var tiny = require('tinytinycolor');
var createExporter = require('../exporter');

var template = fs.readFileSync(__dirname + '/../../templates/iterm.dot', 'utf8');

var lookup = {
  'Background Color': 'background',
  'Foreground Color': 'foreground',
  'Ansi 0 Color': '0',
  'Ansi 8 Color': '8',
  'Ansi 1 Color': '1',
  'Ansi 9 Color': '9',
  'Ansi 2 Color': '2',
  'Ansi 10 Color': '10',
  'Ansi 3 Color': '3',
  'Ansi 11 Color': '11',
  'Ansi 4 Color': '4',
  'Ansi 12 Color': '12',
  'Ansi 5 Color': '5',
  'Ansi 13 Color': '13',
  'Ansi 6 Color': '6',
  'Ansi 14 Color': '14',
  'Ansi 7 Color': '7',
  'Ansi 15 Color': '15'
};

var regex = {
  group: /<key>([^<]*)<\/key>\s*<dict>/gi,
  component: /<key>(Blue|Green|Red) Component<\/key>/gi,
  real: /<real>([\d.]+)<\/real>/gi
};

module.exports = {

  import: function (input) {
    regex.group.lastIndex = 0;
    var output = {};

    var group;
    while ((group = regex.group.exec(input)) !== null) {
      var groupName = group[1];
      var colorName = lookup[groupName];
      if (! colorName) continue;

      regex.component.lastIndex = group.index;
      var color = {};
      for (var i = 0; i < 3; i++) {
        var component = regex.component.exec(input);
        if (! component) continue;

        var componentName = component[1].toLowerCase();
        regex.real.lastIndex = component.index;
        color[componentName] = regex.real.exec(input)[1] * 255;
      }
      output[colorName] = tiny({
        r: color.red, g: color.green, b: color.blue
      });
    }

    return output;
  },

  export: createExporter(template, _.partialRight(_.mapValues, function (color) {
    return color.toSrgbArray();
  }))

};
