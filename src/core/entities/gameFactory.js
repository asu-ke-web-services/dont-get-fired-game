/**
 * A Factory that makes Games
 */
var Game = function( options ) {
  options = options || {};
  this.quartersPast = 0;
  this.user;
  this.products;
  this.materials;
  this.consumers;
  this.interval;

  // Sections: If possible, we want to split out each of these into there own files or systems
  // This way we can split up the work, with out steping on each others toes.

  //Setup
  this.createGame = function() {

    //loadJson
    //Any start values, such as user income
    //call UIInterface SetupUI
    //setupTraining
  };
  this.loadJson = function() {

  };
  this.setupTraining = function() {

    //Give user a single factory
    //UIInterface.SetupTraining
  };
  this.endTraining = function() {

    //runQuarter()
    //Trigger intervalRun to run once every Second
  };

  //Perception
  this.getPerception = function() {

    //Calculate Perception
  };

  //Add
  this.addMaterial = function( material, factory, fromUI ) {

    //Add material to factory
    //factory.material = material;
    //if(fromUI == false)
    //  call UIInterface AddMaterial
    //return true
  };
  this.addProduct = function( product, factory, fromUI ) {

    // if(user.income >= product.setupCost)
    //{
    //   user.income = user.income - product.setupCost
    //   factory.product = product;
    //   if(fromUI == false)
    //     call UIInterface AddMaterial
    //     return true;
    //
    //}
    // else
    //  return false;
  };
  this.addConsumer = function( consumer, factory, fromUI ) {

    // if(user.income >= product.setupCost)
    //{
    //   user.income = user.income - product.setupCost
    //   factory.product = product;
    //   if(fromUI == false)
    //     call UIInterface AddMaterial
    //}
  };
  this.addFactory = function( fromUI ) {

    // if(user.income >= factory.setupCost) //???
    //{
    //   user.income = user.income - product.setupCost
    //   user.factories Add new factory
    //   if(fromUI == false)
    //     call UIInterface AddMaterial
    //}
  };

  //Quarter And Interval
  this.runQuarter = function() {

    //This is used for consumer, and it needs a snap shot
    // before anything in this quarter happens.
    //currentPerception = getPerception()

    //loop though all factories

    //Generate Products
    //factory asks consumer, for need
    //consumer tells factory how many products it needs
    // ( consumers.baseByRate * currentPerception)
    //factory checks its inventory and if doesnt have enoufe
    // to meet the need attempts to create more
    //factory does a cost analysis by looking at material, and
    // product to determine if it can make more goods
    //If it can it makes a full set of goods
    //If it cant it makes no goods
    //Consumers sale as many product as possible

    //QuarterLog
    //Geneartes quarterLog and saves to user

    //UIInterface
    // Update After Quarter
  };
  this.intervalRun = function() {

    //interval++;
    //If (interval == 180)
    //{
    //  //Run Quarter
    //  interval = 0;
    //
    //}
    //else
    //{
    //  UIInterface.IntervalUpdate()
    //}
  };

};

module.exports = Game;
