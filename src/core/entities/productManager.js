/**
 * A Product Manager
 */
var productManager = function( products ) {

    //User should treat these as read only.
    this.products = products;
    this.availableProducts = products;

    this.getProduct = function( product )
    {
        //if factory exist in availableProducts
            //remove the product from availableProducts
        //else
            //return null (this means its not available)
    };
}