/**
 * A Material Manager
 */
var MaterialManager = function( materials ) {
  var _materials = materials;
  var _availableMaterials = materials;

  /**
   * If the material is available, returns true and
   * removes the function from the available materials
   *
   * Otherwise, return false.
   */
  var reserveMaterial = function( material ) {
    if ( _availableMaterials != null ) {
      for ( var index = 0; index < _availableMaterials.length; index++ ) {
        if ( _availableMaterials[ index ] === material ) {
          _availableMaterials.splice( index, 1 );

          return true;
        }
      }
    }

    return false;
  };

  var getAvailableMaterials = function() {
    return _availableMaterials;
  };

  return {
    reserveMaterial: reserveMaterial,
    getAvailableMaterials: getAvailableMaterials
  };
};

module.exports = MaterialManager;

