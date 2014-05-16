module.exports = {};

var formats = [
  'css', 'defaults', 'iterm', 'termite', 'url', 'xresources'
];

formats.forEach(function (file) {
  module.exports[file] = require('./lib/' + file);
});
