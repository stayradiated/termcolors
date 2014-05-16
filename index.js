module.exports = {};

var formats = [
  'css', 'defaults', 'iterm', 'mintty', 'termite', 'url', 'xfce', 'xresources'
];

formats.forEach(function (file) {
  module.exports[file] = require('./lib/' + file);
});
