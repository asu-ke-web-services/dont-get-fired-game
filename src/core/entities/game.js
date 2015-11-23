/**
 * A Game
 */
var Game = function( options ) {
  options = options || {};
  this.quartersPast = options.quartersPast != undefined ? options.quartersPast : 0;
  this.user = options.user != undefined ? options.user : null;

  this.factoryManager = null;
  this.materialManager = null;
  this.productManager = null;
  this.storeManager = null;

  //Setup
  this.createGame = function() {

    //loadJson
    //Any start values, such as user income
    //call UIInterface SetupUI
    //setupTraining
  };
  this.loadJson = function() {
      $.getJSON( "game/data.json", function( data ) {
                this.materialManager = new materialManager(data.Materials);
                this.productManager = new productManager(data.Products);
                this.storeManager = new storeManager(data.Stores);
                });
  };

  //Add [Contains Game Logic]
  this.addMaterial = function( material, factory ) {
    var mat = materialManager.getMaterial( material );
    if ( mat == null )
    {
      return false;
    } else
    {
      factory.material = material;
      user.materials.push( material );

      //Update UI

      return true;
    }
  };
  this.addProduct = function( product, factory ) {

    var pro = productManager.getProduct( product );
    if ( pro == null )
    {
      return false;
    } else
    {
      if ( product.setupcost > user.totalIncome )
      {
        return false;
      } else
      {
        user.totalIncome = user.totalIncome - product.setupcost;
        factory.product = product;
        user.products.push( product );

        //Update UI

        return true;
      }
    }
  };
  this.addStore = function( store, factory ) {

    var sto = storeManager.getStore( store );
    if ( sto == null )
    {
      return false;
    } else
    {
      factory.store = store;
      user.stores.push( store );

      //Update UI

      return true;
    }
  };
  this.addFactory = function( ) {

    if ( 10 > user.totalIncome )
    {
      return false;
    } else
    {
      user.totalIncome = user.totalIncome - 10;
      user.factories.push( new Factory() );

      //Update UI

      return true;
    }

  };

  //Perception
  this.getPerception = function() {

    //Calculate Perception
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

};

module.exports = Game;
