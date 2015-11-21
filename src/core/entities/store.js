var Store = function(name, product, pricePerProduct, wastePerProduct, baseBuyRateForProducts) {
  this.name = name;
  this.product = product;
  this.pricePerProduct = pricePerProduct;
  this.wastePerProduct = wastePerProduct;
  this.baseBuyRateForProducts = this.baseBuyRateForProducts;
};

module.exports = Store;

