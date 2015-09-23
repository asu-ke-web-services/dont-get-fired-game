var gulp    = require('gulp');
var runSequence = require('run-sequence');

var jasmine = require('gulp-jasmine');
var cover   = require('gulp-coverage');
var coveralls = require('gulp-coveralls');

var options = {
  testPaths : {
    unit : [
      'tests/unit/*.js',
      'tests/unit/**/*.js',
    ],
    spec : [
      'tests/spec/*.js',
      'tests/spec/**/*.js',
    ],
    integration : [
      'tests/integration/*.js',
      'tests/integration/**/*.js',
    ]
  },
  filePaths : {
    core : [
      'src/core/*.js',
      'src/core/**/*.js'
    ],
    framework : [
      'src/framework/*.js',
      'src/framework/**/*.js'
    ],
  },
  jasmine : {
    includeStackTrace : true,
    verbose: true
  }
}
gulp.task('test', function () {
   return gulp.src( options.testPaths.spec )
          .pipe(cover.instrument({
            pattern: options.filePaths.core,
            debugDirectory: 'debug'
          }))
          .pipe( jasmine( options.jasmine ) )
          .pipe(cover.gather())
          .pipe(cover.format({
            reporter: 'lcov'
          }))
          .pipe(coveralls())
          .pipe(gulp.dest('coverage'));
});

gulp.task('default', function ( cb ) {
  runSequence( 'test', 'build', cb );
});
