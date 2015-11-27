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
      game.runTest();
    }
    );

  };

  //Add
  this.addMaterial = function( material, factory ) {
    if ( materialManager.reserveMaterial( material ) ) {
      factory.material = material;
      user.materials.push( material );

      //Update UI

      return true;
    } else {
      return false;
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
    } else {
      return false;
    }

  };
  this.addStore = function( store, factory ) {
    if ( this.storeManager.reserveStore( store ) ) {
      factory.store = store;
      this.user.stores.push( store );

      //Update UI

      return true;
    } else
    {
      return false;
    }
  };
  this.addFactory = function( ) {

    if ( 10 > user.totalIncome ) {
      return false;
    } else {
      user.totalIncome -= 10;
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

    var currentPerception = this.getPerception();
    var totalIncome = 0;
    var totalWaste = 0;
    var totalItemsSold = 0;
    var totalConsumerPaid = 0;

    //loop though all factories
    for ( var i = 0; index < this.user.factories.length; i++ ) {
      var factory  = this.user.factories[ i ];

      if ( factory.store != null )
      {

        //Requested From Store
        var totalRequested =
            factory.store.baseBuyRateForProducts * currentPerception;

        //Make Products
        var costPerProduct =
            factory.material.costPerPound * factory.product.materialDependency.amount;
        while ( factory.totalInventory < totalRequested &&
        costPerProduct <= this.user.totalIncome ) {
          this.user.totalIncome -= costPerProduct;
          totalWaste += factory.material.wastePerPound * factory.product.materialDependency.amount;
          totalIncome -= costPerProduct;
          factory.totalInventory++;
        }

        //Sell To Store
        var amount = 0;
        if ( factory.totalInventory > totalRequested ) {
          amount = totalRequested;
        } else {
          totalRequested = this.user.factories[ i ].totalInventory;
        }
        factory.totalInventory +=  amount;
        totalIncome += store.pricePerProduct * amount;
        totalItemsSold += amount;
        totalConsumerPaid += store.pricePerProduct * amount;
        totalWaste += store.wastePerProduct * amount;
        factory.totalInventory -= amount;
      }

    }

    //Generate Quarter Log
    var quarterLog = new QuarterLog( totalItemsSold, totalConsumerPaid, totalWaste, totalIncome );
    user.quarterLog.push( quarterLog );

    //Quarters Past
    this.quartersPast++;

    //Update UI
  };

  //Add
  this.addMaterial = function( material, factory ) {
    if ( this.materialManager.reserveMaterial( material ) ) {
      factory.material = material;
      this.user.materials.push( material );

      //Update UI

      return true;
    }
  };
  this.addProduct = function( product, factory ) {
    if ( product.setupCost > this.user.totalIncome ) {
      return false;
    }

    if ( this.productManager.reserveProduct( product ) ) {
      this.user.totalIncome -= product.setupCost;
      factory.product = product;

      //Update UI

      return true;
    }

  };
  this.addStore = function( store, factory ) {
    if ( this.storeManager.reserveStore( store ) ) {
      factory.store = store;
      this.user.stores.push( store );

      //Update UI

      return true;
    }
  };
  this.addFactory = function( ) {

    if ( 10 > this.user.totalIncome ) {
      return false;
    } else {
      this.user.totalIncome = this.user.totalIncome - 10;
      this.user.factories.push( new Factory() );

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
    console.log( 'Run Start' );
    var currentPerception = this.getPerception();
    var totalIncome = 0;
    var totalWaste = 0;
    var totalItemsSold = 0;
    var totalConsumerPaid = 0;

    //loop though all factories
    for ( var i = 0; i < this.user.factories.length; i++ ) {

      var factory = this.user.factories[ i ];
      console.log( 'Factory:' + factory );

      if ( factory.store != null ) {

        //Requested From Store
        console.log( 'BaseBuyRateForProducts:' + factory.store.baseBuyRateForProducts );
        console.log( 'currentPerception:' + currentPerception );

        var totalRequested = Math.floor( factory.store.baseBuyRateForProducts * currentPerception );
        console.log( 'TotalRequested:' + totalRequested );

        //Make Products
        var costPerProduct =
            factory.material.costPerPound * factory.product.materialDependency.amount;

        console.log( 'Cost Per Product:' + costPerProduct );

        while ( factory.totalInventory < totalRequested &&
        costPerProduct <= this.user.totalIncome ) {
          this.user.totalIncome -= costPerProduct;
          totalWaste += factory.material.wastePerPound * factory.product.materialDependency.amount;
          totalIncome -= costPerProduct;
          factory.totalInventory++;

        }
        console.log( 'TotalInventory:' + factory.totalInventory );

        //Sell To Store
        var amount = 0;

        if ( factory.totalInventory > totalRequested ) {
          amount = totalRequested;
        } else {
          amount = factory.totalInventory;
        }
        console.log( 'Amount:' + amount );

        factory.totalInventory +=  amount;
        totalIncome += factory.store.pricePerProduct * amount;
        totalItemsSold += amount;
        totalConsumerPaid += factory.store.pricePerProduct * amount;
        totalWaste += factory.store.wastePerProduct * amount;
        this.user.factories[ i ].totalInventory -= amount;
      } else {
        console.log( 'No Store ' );
      }
      console.log( '' );
    }

    //Generate Quarter Log
    var quarterLog = new QuarterLog( totalItemsSold, totalConsumerPaid, totalWaste, totalIncome );
    this.user.quarterLog.push( quarterLog );

    //Quarters Past
    this.quartersPast++;

    //Update UI

    console.log( 'Run End' );
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
    this.checkRunQuarter();
    this.checkRunQuarter();
  };

  this.showGameObject = function() {
    console.log( 'Game' );
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
    console.log(  this.materialManager.getAvailableMaterials()[ 0 ] );
    console.log( 'Factory' );
    console.log(  this.user.factories[ 0 ] );
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
    console.log(  this.productManager.getAvailableProducts()[ 0 ] );
    console.log( 'Factory' );
    console.log(  this.user.factories[ 0 ] );
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
    console.log(  this.storeManager.getAvailableStores()[ 0 ] );
    console.log( 'Factory' );
    console.log(  this.user.factories[ 0 ] );
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
    console.log( this.user.quarterLog[ this.user.quarterLog.length - 1 ] );
    console.log( '' );
  };
};

module.exports = Game;
