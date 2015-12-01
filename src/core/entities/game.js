var UiInterface = require( '../ui/ui-interface' );
var MaterialManager = require( '../managers/material-manager' );
var ProductManager = require( '../managers/product-manager' );
var StoreManager = require( '../managers/store-manager' );
var Factory = require( '../entities/factory' );
var QuarterLog = require( '../entities/quarterLog' );
var User = require( '../entities/user' );
/**
 * A Game
 */
var Game = function( options ) {
  options = options || {};
  this.quartersPast = options.quartersPast != undefined ? options.quartersPast : 0;
  this.user = options.user != undefined ?
      options.user :  new User( 'Tester', { totalIncome:20000 } );

  this.materialManager = null;
  this.productManager = null;
  this.storeManager = null;

  UiInterface.setGame( this );

  //Setup
  this.createGame = function() {
    this.user.factories.push( new Factory( 'Start Factory' ) );
    this.loadJson();

  };
  this.loadJson = function() {
    var game = this;
    $.getJSON( 'data/data.json', function( data ) {
      game.materialManager = new MaterialManager( data.Materials );
      game.productManager = new ProductManager( data.Products );
      game.storeManager = new StoreManager( data.Stores );
    } ).then( function( data ) {

      UiInterface.rePaint();

      //game.runTest();
    }
    );

  };

  //Add
  this.addMaterial = function( material, factory ) {
    if ( this.materialManager.reserveMaterial( material ) ) {
      factory.material = material;
      this.user.materials.push( material );

      UiInterface.rePaint();

      return true;
    } else {
      return false;
    }
  };
  this.addProduct = function( product, factory ) {
    if ( product.setupcost > this.user.totalIncome ) {
      return false;
    }

    if ( this.productManager.reserveProduct( product ) ) {
      this.user.totalIncome -= product.setupCost;
      factory.product = product;

      UiInterface.rePaint();

      return true;
    } else {
      return false;
    }

  };
  this.addStore = function( store, factory ) {
    if ( this.storeManager.reserveStore( store ) ) {
      factory.store = store;
      this.user.stores.push( store );

      UiInterface.rePaint();

      return true;
    } else
    {
      return false;
    }
  };
  this.addFactory = function() {

    if ( 10000 > this.user.totalIncome ) {
      return false;
    } else {
      this.user.totalIncome -= 10000;
      this.user.factories.push( new Factory() );

      UiInterface.rePaint();

      return true;
    }
  };

  //Perception
  this.between = function( wasteRate, min, max ) {
    return wasteRate >= min && wasteRate <= max;
  };
  this.getPerception = function() {

    if ( this.user.quarterLog.length != 0 )
    {
      var lastQuarterLog = this.user.quarterLog[ this.user.quarterLog.length - 1 ];
      var wasteRate = .5;
      var factoryRate = 0;
      var storeRate = 0;
      var totalRates = 0;
      if ( lastQuarterLog.itemsMade != 0 )
      {
        factoryRate = ( lastQuarterLog.factoryWaste /  lastQuarterLog.itemsMade );
        totalRates++;
      }
      if ( lastQuarterLog.itemsSold != 0 )
      {
        storeRate = ( lastQuarterLog.storeWaste /  lastQuarterLog.itemsSold );
        totalRates++;
      }
      if ( totalRates != 0 )
      {
        wasteRate = ( factoryRate + storeRate ) / 2;
      }

      console.log( 'Waste Rate:' +  wasteRate );

      if ( wasteRate === 0 )
      {
        return 10;
      } else if ( this.between( wasteRate, 0.00001, 0.1 ) ) {
        return 9;
      } else if ( this.between( wasteRate, 0.1, 0.2 ) ) {
        return 8;
      } else if ( this.between( wasteRate, 0.2, 0.3 ) ) {
        return 7;
      } else if ( this.between( wasteRate, 0.3, 0.4 ) ) {
        return 6;
      } else if ( this.between( wasteRate, 0.4, 0.5 ) ) {
        return 5;
      } else if ( this.between( wasteRate, 0.5, 0.6 ) ) {
        return 4;
      } else if ( this.between( wasteRate, 0.6, 0.8 ) ) {
        return 3;
      } else if ( this.between( wasteRate, 0.8, 1 ) ) {
        return 2;
      } else {
        return 1;
      }

    } else {
      return 5;
    }
  };

  //Quarter
  this.runQuarter = function() {
    console.log( '' );
    var currentPerception = this.getPerception();
    var totalPaid = 0;
    var totalItemsMade = 0;
    var totalItemsSold = 0;
    var totalstorePaid = 0;
    var totalstoreWaste = 0;
    var totalfactoryWaste = 0;

    //loop though all factories
    for ( var i = 0; i < this.user.factories.length; i++ ) {
      var factory  = this.user.factories[ i ];
      var paid = 0;
      var itemsMade = 0;
      var itemsSold = 0;
      var storePaid = 0;
      var storeWaste = 0;
      var factoryWaste = 0;
      var factoryStartInventory = factory.totalInventory;
      var startIncome = this.user.totalIncome;

      if ( factory.store != null ) {

        //Requested From Store
        var totalRequested =
            Math.floor( factory.store.baseBuyRateForProducts * ( currentPerception / 5 ) );

        //Make Products
        var costPerProductSet =
            factory.material.costPerPound * factory.product.materialDependency.amount *
            factory.product.totalOutput;

        while ( factory.totalInventory < totalRequested &&
        costPerProductSet <= this.user.totalIncome ) {
          this.user.totalIncome -= costPerProductSet;
          factory.totalInventory += factory.product.totalOutput;

          //Logging
          totalItemsMade += factory.product.totalOutput;
          paid += costPerProductSet;
          factoryWaste += factory.material.wastePerPound *
              factory.product.materialDependency.amount;
        }

        //Sell To Store
        var amount = 0;
        if ( factory.totalInventory > totalRequested ) {
          amount = totalRequested;
        } else {
          amount = this.user.factories[ i ].totalInventory;
        }
        this.user.totalIncome += factory.store.pricePerProduct * amount;
        factory.totalInventory -= amount;

        //Logging
        itemsSold += amount;
        storePaid += factory.store.pricePerProduct * amount;
        storeWaste += factory.store.wastePerProduct * amount;

        console.log( 'Total Quarter Logs: ' + this.user.quarterLog.length );
        console.log( 'Perception: ' + currentPerception );
        console.log( 'baseBuyRateForProducts: ' + factory.store.baseBuyRateForProducts );
        console.log( 'Requested: ' + totalRequested );
        console.log( 'Start Inventory: ' + factoryStartInventory );
        console.log( 'User.totalIncome: ' + startIncome );
        console.log( 'Items Per Set: ' + factory.product.totalOutput );
        console.log( 'Cost Per Product Set: ' + costPerProductSet );
        console.log( 'Items Made: ' + totalItemsMade );
        console.log( 'Paid: ' + totalItemsMade );
        console.log( 'Factory Waste: ' + factoryWaste );
        console.log( 'End Inventory: ' + factory.totalInventory );
        console.log( 'ItemsSold: ' + amount );
        console.log( 'Store Paid: ' + storePaid );
        console.log( 'Store Waste: ' + storeWaste );
        console.log( 'User.totalIncome: ' + this.user.totalIncome );
        totalPaid += paid;
        totalItemsMade += itemsMade;
        totalItemsSold += itemsSold;
        totalstorePaid += storePaid;
        totalstoreWaste += storeWaste;
        totalfactoryWaste += factoryWaste;

      }

    }
    console.log( '' );
    this.user.totalWaste += totalstoreWaste + totalfactoryWaste;

    //Generate Quarter Log
    var quarterLog = new QuarterLog( totalPaid, totalItemsMade,
        totalItemsSold, totalstorePaid, totalstoreWaste, totalfactoryWaste );
    console.log( 'QuarterLog: ' + quarterLog );
    this.user.quarterLog.push( quarterLog );

    //Quarters Past
    this.quartersPast++;

    UiInterface.rePaint();
  };

  //Tests
  this.runTest = function() {
    this.showGameObject();
    this.checkSetup();
    this.checkLoadJson();
    this.checkAddMaterial();
    this.checkAddProduct();
    this.checkAddStore();
    this.checkAddFactory();
    this.checkRunQuarter();
    this.checkRunQuarter();
    this.checkRunQuarter();
  };

  this.showGameObject = function() {
    console.log( 'Game [Live Pointer]' );
    console.log( '---------' );

    console.log( this );
    console.log( '' );
  };
  this.checkSetup = function() {
    console.log( 'Setup ' );
    console.log( '---------' );
    console.log( 'User' );
    var userCurrent = jQuery.extend( true, {}, this.user );
    console.log( userCurrent );
    console.log( '' );
  };
  this.checkLoadJson = function() {

    var getAvailableMaterialsCurrent = jQuery.extend( true, {},
        this.materialManager.getAvailableMaterials()  );
    var getAvailableProductsCurrent = jQuery.extend( true, {},
        this.productManager.getAvailableProducts()  );
    var getAvailableStoresCurrent = jQuery.extend( true, {},
        this.storeManager.getAvailableStores()  );

    console.log( 'Load Json' );
    console.log( '---------' );
    console.log( 'Materials' );
    console.log( getAvailableMaterialsCurrent );
    console.log( 'Products' );
    console.log( getAvailableProductsCurrent );
    console.log( 'Stores' );
    console.log( getAvailableStoresCurrent );
    console.log( '' );
  };
  this.checkAddMaterial = function() {
    console.log( 'Add Material' );
    console.log( '---------' );
    console.log( 'Material' );
    var firstMaterial = jQuery.extend( true, {},
        this.materialManager.getAvailableMaterials()[ 0 ] );
    console.log( firstMaterial );
    console.log( 'Factory' );
    var firstFactory = jQuery.extend( true, {}, this.user.factories[ 0 ] );
    console.log( firstFactory );
    console.log( 'AddMaterial()' );
    this.addMaterial( this.materialManager.getAvailableMaterials()[ 0 ],
        this.user.factories[ 0 ] );
    console.log( 'Available Materials' );
    var getAvailableMaterialsCurrent = jQuery.extend( true, {},
        this.materialManager.getAvailableMaterials() );
    console.log( getAvailableMaterialsCurrent );
    console.log( 'User' );
    var userCurrent = jQuery.extend( true, {}, this.user );
    console.log( userCurrent );
    console.log( '' );
  };
  this.checkAddProduct = function() {
    console.log( 'Add Product' );
    console.log( '---------' );
    console.log( 'Product' );
    var firstProduct = jQuery.extend( true, {},
        this.productManager.getAvailableProducts()[ 0 ] );
    console.log(  firstProduct );
    console.log( 'Factory' );
    var firstFactory = jQuery.extend( true, {},
        this.user.factories[ 0 ] );
    console.log( firstFactory );
    console.log( 'AddProduct()' );
    this.addProduct( this.productManager.getAvailableProducts()[ 0 ],
        this.user.factories[ 0 ] );
    console.log( 'Available Products' );
    var getAvailableProductsCurrent = jQuery.extend( true, {},
        this.productManager.getAvailableProducts() );
    console.log( getAvailableProductsCurrent );
    console.log( 'User' );
    var userCurrent = jQuery.extend( true, {}, this.user );
    console.log( userCurrent );
    console.log( '' );
  };
  this.checkAddStore = function() {
    console.log( 'Add Store' );
    console.log( '---------' );
    console.log( 'Store' );
    var firstStore = jQuery.extend( true, {},
        this.storeManager.getAvailableStores()[ 0 ] );
    console.log( firstStore );
    console.log( 'Factory' );
    var firstFactory = jQuery.extend( true, {},
        this.user.factories[ 0 ] );
    console.log( firstFactory );
    console.log( 'AddStore()' );
    this.addStore( this.storeManager.getAvailableStores()[ 0 ],
        this.user.factories[ 0 ] );
    console.log( 'Available Stores' );
    var getAvailableStoresCurrent = jQuery.extend( true, {},
        this.storeManager.getAvailableStores() );
    console.log( getAvailableStoresCurrent );
    console.log( 'User' );
    var userCurrent = jQuery.extend( true, {}, this.user );
    console.log( userCurrent );
    console.log( '' );
  };
  this.checkAddFactory = function() {
    console.log( 'Add Factory' );
    console.log( '---------' );
    console.log( 'User' );
    var userCurrentBefore = jQuery.extend( true, {}, this.user );
    console.log( userCurrentBefore );
    console.log( 'AddFactory()' );
    this.addFactory();
    console.log( 'User' );
    var userCurrentAfter = jQuery.extend( true, {}, this.user );
    console.log( userCurrentAfter );
    console.log( '' );
  };
  this.checkRunQuarter = function() {
    console.log( 'Run Quarter' );
    console.log( '---------' );
    var userCurrent = jQuery.extend( true, {}, this.user );
    console.log( 'User' );
    console.log(  userCurrent );
    console.log( 'RunQuaterLog' );
    this.runQuarter();
    console.log( 'User' );
    var userCurrentAfter = jQuery.extend( true, {}, this.user );
    console.log( userCurrentAfter );
    console.log( 'QuaterLog' );
    var quarterLog = jQuery.extend( true, {},
        this.user.quarterLog[ this.user.quarterLog.length - 1 ] );
    console.log( quarterLog );
    console.log( '' );
  };
};

module.exports = Game;
