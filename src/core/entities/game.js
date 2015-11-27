var UiInterface = require( '../ui/ui-interface' );
var MaterialManager = require( __core + 'managers/material-manager' );
var ProductManager = require( __core + 'managers/product-manager' );
var StoreManager = require( __core + 'managers/store-manager' );
var Factory = require( __core + 'entities/factory' );
var QuarterLog = require( __core + 'entities/quarterLog' );
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

  UiInterface.setGame( this );

  //Setup
  this.createGame = function() {
    this.loadJson();
  };
  this.loadJson = function() {
    $.getJSON( 'data/data.json', function( data ) {
      this.materialManager = new materialManager( data.Materials );
      this.productManager = new productManager( data.Products );
      this.storeManager = new storeManager( data.Stores );
    } );
  };

  //Add
  this.addMaterial = function( material, factory ) {
    if ( materialManager.reserveMaterial( material ) ) {
      factory.material = material;
      user.materials.push( material );

      //Update UI

      return true;
    }
  };
  this.addProduct = function( product, factory ) {
    if ( product.setupcost > user.totalIncome ) {
      return false;
    }

    if ( productManager.reserveProduct( material ) ) {
      user.totalIncome -= product.setupcost;
      factory.product = product;
      user.products.push( product );

      //Update UI

      return true;
    }

  };
  this.addStore = function( store, factory ) {
    if ( storeManager.reserveStore( material ) ) {
      factory.store = store;
      user.stores.push( store );

      //Update UI

      return true;
    }
  };
  this.addFactory = function( ) {

    if ( 10 > user.totalIncome ) {
      return false;
    } else {
      user.totalIncome = user.totalIncome - 10;
      user.factories.push( new Factory() );

      //Update UI

      return true;
    }
  };

  //Perception
  this.getPerception = function() {

    return 1;
  };

  //Quarter
  this.runQuarter = function() {

    var currentPerception = getPerception();
    var totalIncome = 0;
    var totalWaste = 0;
    var totalItemsSold = 0;
    var totalConsumerPaid = 0;

    //loop though all factories
    for ( var i = 0; index < this.user.factories.length; i++ ) {

      //Requested From Store
      var totalRequested =
          this.user.factories[ i ].store.baseBuyRateForProducts * currentPerception;

      //Make Products
      var costPerProduct =
          factory.material.costPerPound * factory.product.materialDependency.amount;
      while ( this.user.factories[ i ].totalInventory < totalRequested &&
      costPerProduct <= user.totalIncome ) {
        user.totalIncome -= costPerProduct;
        totalWaste += factory.material.wastePerPound * factory.product.materialDependency.amount;
        totalIncome -= costPerProduct;
        factory.totalInventory++;
      }

      //Sell To Store
      var amount = 0;
      if ( this.user.factories[ i ].totalInventory > totalRequested ) {
        amount = totalRequested;
      } else {
        totalRequested = this.user.factories[ i ].totalInventory;
      }
      factory.totalInventory +=  amount;
      totalIncome += store.pricePerProduct * amount;
      totalItemsSold += amount;
      totalConsumerPaid += store.pricePerProduct * amount;
      totalWaste += store.wastePerProduct * amount;
      this.user.factories[ i ].totalInventory -= amount;
    }

    //Generate Quarter Log
    var quarterLog = new QuarterLog( totalItemsSold, totalConsumerPaid, totalWaste, totalIncome );
    user.quarterLog.push( quarterLog );

    //Quarters Past
    this.quartersPast++;

    //Update UI
  };

};

module.exports = Game;
