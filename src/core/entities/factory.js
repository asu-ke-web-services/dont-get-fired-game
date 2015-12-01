/**
 * A Factory game entity, not an algorithm structure
 * Contains data for Factory game entities. Only
 * the name is required
 *
 * @param name String
 * @param options Object Optional
 * - product
 * - material
 * - store
 * - totalInventory
 */
var Factory = function( name, options ) {
  options = options || {};

  this.name = name;
  this.product = options.product || null;
  this.material = options.material || null;
  this.store = options.store || null;
  this.totalInventory = options.totalInventory || 0;
};

module.exports = Factory;
