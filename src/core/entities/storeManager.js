/**
 * A Store Manager
 */
var StoreManager = function( stores ) {

  //User should treat these as read only.
  this.stores = stores;
  this.availablestores = stores;

  this.getProduct = function( store )
  { //if store exist in availablestores
    //  remove the product from availablestores
    //else
    //  return null (this means its not available)
    if ( this.availablestores  != null )
    {
      for ( var index = 0; index < this.availablestores.length; index++ ) {
        if ( this.availablestores[ index ] === store ) {
          this.availablestores.splice( index, 1 );
        }
      }
    }else
    {
      return false;
    }
  };
};
module.exports = StoreManager;
