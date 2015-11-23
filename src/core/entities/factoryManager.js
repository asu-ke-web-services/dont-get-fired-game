/**
 * A Factory Manager
 */
var FactoryManager = function( factories ) {

  //User should treat these as read only.
  this.factories = factories;
  this.availableFactories = factories;

  this.getFactory = function( factory )
  {
    //if factory exist in availableFactories
    //  remove the material from availableFactories
    // else
    //  return null (this means its not available)
    if ( this.availableFactories  != null )
    {
      for ( var index = 0; index < this.availableFactories.length; index++ ) {
        if ( this.availableFactories[ index ] === factory ) {
          this.availableFactories.splice( index, 1 );
        }
      }
    }else
    {
      return false;
    }
  };
};
module.exports = FactoryManager;

