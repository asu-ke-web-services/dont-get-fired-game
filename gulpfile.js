var gulp        = require( 'gulp' );
var runSequence = require( 'run-sequence' );

var jasmine   = require( 'gulp-jasmine' );
var cover     = require( 'gulp-coverage' );
var coveralls = require( 'gulp-coveralls' );

var jscs = require( 'gulp-jscs' );

var options = {
  testPaths: {
    unit: [
      'tests/unit/*.js',
      'tests/unit/**/*.js'
    ],
    spec: [
      'tests/spec/*.js',
      'tests/spec/**/*.js'
    ],
    integration: [
      'tests/integration/*.js',
      'tests/integration/**/*.js'
    ]
  },
  filePaths: {
    core: [
      'src/core/*.js',
      'src/core/**/*.js'
    ],
    framework: [
      'src/framework/*.js',
      'src/framework/**/*.js'
    ]
  },
  allPaths: [
    '*.js',
    '**/*.js',
    '!.coverdata/**',
    '!coverage/**',
    '!debug/**',
    '!node_modules/**'
  ],
  jasmine: {
    includeStackTrace: true,
    verbose: true
  },
  entryPoint: './index.js'
};

gulp.task( 'test', function() {
    var temp = gulp.src( [ options.entryPoint ].concat( options.testPaths.spec ) )
          .pipe( cover.instrument( {
            pattern: options.filePaths.core,
            debugDirectory: 'debug'
          } ) )
          .pipe( jasmine( options.jasmine ) )
          .pipe( cover.gather() )
          .pipe( cover.format( {
            reporter: 'lcov'
          } ) );

  if ( process.env.CI ) {
    temp = temp.pipe( coveralls() );
  }

  temp = temp.pipe( gulp.dest( 'coverage' ) );

  return temp;
} );

gulp.task( 'lint', function() {
  return gulp.src( options.allPaths )
        .pipe( jscs() )
        .pipe( jscs.reporter() );
} );

gulp.task( 'default', function( cb ) {
  runSequence( [ 'test', 'lint' ], cb );
} );
