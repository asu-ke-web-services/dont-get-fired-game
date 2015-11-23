/**
 * A Material Manager
 */
var MaterialManager = function( materials ) {

  //User should treat these as read only.
  this.materials = materials;
  this.availableMaterials = materials;

  this.getMaterials = function( material ) {
    if ( this.availableMaterials  != null ) {
      for ( var index = 0; index < this.availableMaterials.length; index++ ) {
        if ( this.availableMaterials[ index ] === material ) {
          this.availableMaterials.splice( index, 1 );
        }
      }
    }else {
      return false;
    }
  };
};
module.exports = MaterialManager;

