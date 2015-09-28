/**
 * This is the entry point for the NodeJS application
 */

/**
 * Set up a better way of requiring files
 *
 * By default, you will have to require files relative
 * to the directory you are in. This can result in ugly
 * paths like: `../../../../src/core/myfile`. Instead,
 * use `__base/src/core/myfile`.
 */
global.__base        = __dirname + '/';
global.__src         = __dirname + '/src/';
global.__core        = __dirname + '/src/core/';
global.__framework   = __dirname + '/src/framework/';
global.__game        = __dirname + '/src/game/';
global.__scaffolding = __dirname + '/src/scaffolding/';

if ( console && console.log ) {
  console.log(
    'The Julie Ann Wrigley Global Institute of Sustainability\n' +
    'Copyright Arizona State University 2015\n'
  );
}

// TODO create an instance of the game
