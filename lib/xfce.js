module.exports = {

  import: function () {
  },

  export: function (input) {
    var output = '[Configuration]\n';
    output += 'ColorBackground=' + input.background.toHexString() + '\n';
    output += 'ColorForegrond=' + input.foreground.toHexString() + '\n';
    output += 'ColorCursor=' + input.foreground.toHexString() + '\n';

    for (var i = 0; i < 16; i++) {
      output += 'ColorPalette' + i + '=' + input[i].toHexString() + '\n';
    }

    return output;
  }

};
