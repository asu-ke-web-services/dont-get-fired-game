/*
 |----------------------------------------------
 | Gulp
 |----------------------------------------------
 |
 | Add any compile steps here. Always use gulp
 | to make a build
 |
 */

var path = require( 'path' );

// Core
var gulp        = require( 'gulp' );
var rename      = require( 'gulp-rename' );
var runSequence = require( 'run-sequence' ).use( gulp );
var browserSync = require( 'browser-sync' ).create();

// Test
var jasmine   = require( 'gulp-jasmine' );
var cover     = require( 'gulp-coverage' );
var coveralls = require( 'gulp-coveralls' );
var qunit     = require( 'gulp-qunit' );

// Lint
var jscs = require( 'gulp-jscs' );

// Build
var sass       = require( 'gulp-sass' );
var webpack    = require( 'webpack' );
var stream     = require( 'webpack-stream' );
var compressor = require( 'gulp-compressor' );
var sourcemaps = require( 'gulp-sourcemaps' );

/*
 |----------------------------------------------
 | Options
 |----------------------------------------------
 |
 | Paths, names, etc used throughout the build
 |
 */
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
    ],
    game: [
      'src/game/*.js',
      'src/game/**/*.js'
    ],
    root: [
      'src/*.js'
    ]
  },
  allPaths: [
    '*.js',
    '**/*.js',
    '!.coverdata/**',
    '!coverage/**',
    '!debug/**',
    '!node_modules/**',
    '!dist/**'
  ],
  jasmine: {
    includeStackTrace: true,
    verbose: true
  },
  entryPoint: 'index',
  buildPath: 'dist/js/',
  servePath: 'dist/'
};

/*
 |----------------------------------------------
 | Tasks
 |----------------------------------------------
 |
 | Gulp tasks can be run through the command
 | line using `gulp`. Use `gulp serve` for
 | continuous compiling and testing.
 |
 */

gulp.task( 'serve', [ 'default' ], function() {
  browserSync.init( {
    server: {
      baseDir: './' + options.servePath
    }
  } );

  var paths = [].concat( options.filePaths.root )
    .concat( options.filePaths.core )
    .concat( options.filePaths.framework )
    .concat( options.filePaths.game );

  console.log( paths );
  gulp.watch( paths, [ 'build' ] );
} );

gulp.task( 'spec-test', function() {
  var src = [ 'tests/spec-loader.js' ]
    .concat( options.testPaths.spec )
    .concat( options.entryPoint );
  var temp = gulp.src( src )
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

gulp.task( 'test', [ 'spec-test' ] );

gulp.task( 'lint', function() {
  return gulp.src( options.allPaths )
    .pipe( jscs() )
    .pipe( jscs.reporter() )
    .pipe( jscs.reporter( 'fail' ) );
} );

gulp.task( 'sass', function() {
  gulp.src( 'src/stylesheets/main.scss' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( gulp.dest( options.servePath + 'css/' ) );
} );

gulp.task( 'compile', function() {
  return gulp.src( options.entryPoint + '.js' )
    .pipe( sourcemaps.init() )
    .pipe( stream( {
      entry: __dirname + '/' + options.entryPoint + '.js',
      output: {
        path: __dirname + '/' + options.buildPath,
        filename: options.entryPoint + '.js'
      },
      resolve: {
        root: __dirname + '/' + 'src'
      },
      resolveLoader: {
        root: path.join( __dirname, 'node_modules' )
      },
      module: {
        loaders: [
            { test: /\.json$/, loader: 'json' }
        ]
      },
      devtool: 'source-map'
    } ) )
    .pipe( sourcemaps.write( options.buildPath ) )
    .pipe( gulp.dest( options.buildPath ) )
    .pipe( browserSync.stream() );
} );

gulp.task( 'minify', function() {
  return gulp.src( options.buildPath + options.entryPoint + '.js' )
    .pipe( compressor() )
    .pipe( rename( options.entryPoint + '.min.js' ) )
    .pipe( gulp.dest( options.buildPath ) );
} );

gulp.task( 'build', function( cb ) {
  runSequence( 'compile', 'sass', 'minify', cb );
} );

gulp.task( 'default', function( cb ) {
  runSequence( [ 'test', 'lint' ], 'build', cb );
} );
