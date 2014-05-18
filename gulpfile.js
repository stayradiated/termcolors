var _ = require('lodash');
var gulp = require('gulp');
var brfs = require('brfs');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

gulp.task('default', ['bundle']); 


/**
 * Bundle code into browser compatible file
 */

gulp.task('bundle', function () {
  return browserify()
  .add('./index.js')
  .exclude('lodash')
  .transform(brfs)
  .bundle({ standalone: 'termColors' })
  .on('error', console.log.bind(console))
  .pipe(source('bundle.min.js'))
  .pipe(streamify(uglify()))
  .pipe(gulp.dest('./'));
});


/**
 * Create examples contents
 */

gulp.task('examples', function () {
  var termcolors = require('./index');
  _.each(termcolors, function (format, name) {
    if (! format.hasOwnProperty('export')) return;
    var file = source(name + '.txt');
    file.write(format.export(termcolors.defaults.colors));
    file.pipe(gulp.dest('./examples'));
  });
});
