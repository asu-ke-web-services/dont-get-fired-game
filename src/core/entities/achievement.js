/**
 * An Achievement
 */
var Achievement = function( options ) {
  options = options || {};

  this.name = options.name ? options.name : '';
};

module.exports = Achievement;
