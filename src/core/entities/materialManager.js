/**
 * A Material Manager
 */
var materialManager = function( materials ) {

    //User should treat these as read only.
    this.materials = materials;
    this.availableMaterials = materials;

    this.getMaterials = function( material )
    {
        //if material exist in availableMaterials
            //remove the material from availableMaterials
        //else
            //return null (this means its not available)
    };
}