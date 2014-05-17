var _ = require('lodash');
var gulp = require('gulp');
var brfs = require('brfs');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('default', ['bundle']); 


/**
 * Bundle code into browser compatible file
 */

gulp.task('bundle', function () {
  return browserify()
  .add('./index.js')
  .exclude('lodash')
  .exclude('dot')
  .transform(brfs)
  .bundle({ standalone: 'termColors' })
  .on('error', console.log.bind(console))
  .pipe(source('termcolors.js'))
  .pipe(gulp.dest('./'));
});


/**
 * Create examples contents
 */

gulp.task('examples', function () {
  var defaults = require('./lib/defaults');
  var exportAs = require('./lib/export');
  _.each(exportAs, function (fn, name) {
    var file = source(name + '.txt');
    file.write(fn(defaults.colors));
    file.pipe(gulp.dest('./examples'));
  });
});
