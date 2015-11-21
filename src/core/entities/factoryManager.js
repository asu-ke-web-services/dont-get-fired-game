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
  };
};
module.exports = FactoryManager;

