var gulp    = require('gulp');
var jasmine = require('gulp-jasmine');
var cover   = require('gulp-coverage');

var options = {
  testPaths : [
    'tests/*.js',
    'tests/**/*.js',
  ],
  filePaths : [
    'framework/*.js',
    'framework/**/*.js',
    'src/*.js',
    'src/**/*.js'
  ],
  jasmine : {
    includeStackTrace : true,
    verbose: true
  }
}

gulp.task('default', function () {
  return gulp.src( options.testPaths )
             .pipe(cover.instrument({
               pattern: options.filePaths,
               debugDirectory: 'debug'
             }))
             .pipe( jasmine( options.jasmine ) )
             .pipe(cover.gather())
             .pipe(cover.format())
             .pipe(gulp.dest('coverage'));
});
