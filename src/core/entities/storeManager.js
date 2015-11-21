/**
 * A Store Manager
 */
var productManager = function( stores ) {

    //User should treat these as read only.
    this.stores = stores;
    this.availablestores = stores;

    this.getProduct = function( store )
    {
        //if store exist in availablestores
        //remove the product from availablestores
        //else
        //return null (this means its not available)
    };
}