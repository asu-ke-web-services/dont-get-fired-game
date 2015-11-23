/**
 * A Product Manager
 */
var ProductManager = function( products ) {
  var _products = products;
  var _availableProducts = products;

  var reserveProduct = function( product ) {
    if ( _availableProducts  != null ) {
      for ( var index = 0; index < _availableProducts.length; index++ ) {
        if ( _availableProducts[ index ] === product ) {
          _availableProducts.splice( index, 1 );

          return true;
        }
      }
    }

    return false;
  };

  var getAvailableProducts = function () {
    return _availableProducts;
  };

  return {
    reserveProduct: reserveProduct,
    getAvailableProducts: getAvailableProducts
  }
};

module.exports = ProductManager;
