/**
 * A Store Manager
 */
var StoreManager = function( stores ) {
  var _stores = stores;
  var _availableStores = stores;

  var reserveStore = function( store ) {
    if ( _availableStores  != null ) {
      for ( var index = 0; index < _availableStores.length; index++ ) {
        if ( _availableStores[ index ] === store ) {
          _availableStores.splice( index, 1 );

          return true;
        }
      }
    }

    return false;
  };

  var getAvailableStores = function() {
    return _availableStores;
  };

  return {
    reserveStore: reserveStore,
    getAvailableStores: getAvailableStores
  };
};
module.exports = StoreManager;
