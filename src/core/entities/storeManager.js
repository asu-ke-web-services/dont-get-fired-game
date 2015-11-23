/**
 * A Store Manager
 */
var StoreManager = function( stores ) {

  //User should treat these as read only.
  this.stores = stores;
  this.availablestores = stores;

  this.getStore = function( store ) {
    if ( this.availablestores  != null ) {
      for ( var index = 0; index < this.availablestores.length; index++ ) {
        if ( this.availablestores[ index ] === store ) {
          this.availablestores.splice( index, 1 );
        }
      }
    }else {
      return false;
    }
  };
};
module.exports = StoreManager;
