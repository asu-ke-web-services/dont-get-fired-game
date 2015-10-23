/**
 * This is the entry point for the NodeJS application
 */
if ( console && console.log ) {
  console.log(
    'The Julie Ann Wrigley Global Institute of Sustainability\n' +
    'Copyright Arizona State University 2015\n'
  );
}

var game = require( './src/game/init' );
game();
