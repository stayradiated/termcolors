var _ = require('lodash');
var gulp = require('gulp');
var brfs = require('gulp-brfs');
var fs = require('fs');

/**
 * Bundle code into browser compatible file
 */

function bundle () {
  return gulp.src('lib/**/*.js', {buffer: false})
  .pipe(brfs())
  .pipe(gulp.dest('pkg'));
};

exports.default = bundle;

gulp.task('bundle', bundle);

/**
 * Create examples contents
 */

gulp.task('examples', function (cb) {
  var termcolors = require('./lib/index');
  _.each(termcolors, function (format, name) {
    if (! format.hasOwnProperty('export')) return;
    fs.writeFile('./examples/' + name + '.txt', format.export(termcolors.defaults.colors), cb);
  });
});
