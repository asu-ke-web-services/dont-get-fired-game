/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * This is the entry point for the NodeJS application
	 */
	if ( console && console.log ) {
	  console.log(
	    'The Julie Ann Wrigley Global Institute of Sustainability\n' +
	    'Copyright Arizona State University 2015\n' +
	    'Made by Capstone++\n'
	  );
	}

	var game  = __webpack_require__( 1 );
	var setup = __webpack_require__( 10 );

	setup();
	game();



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__( 2 );

	var init = function() {
	  var game = new Game();
	  game.createGame();
	};

	module.exports = init;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var UiInterface = __webpack_require__( 3 );
	var MaterialManager = __webpack_require__( 4 );
	var ProductManager = __webpack_require__( 5 );
	var StoreManager = __webpack_require__( 6 );
	var Factory = __webpack_require__( 7 );
	var QuarterLog = __webpack_require__( 8 );
	var User = __webpack_require__( 9 );
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
	      game.runTest();
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	
	var UIInterface = ( function() {
	  var _game = null;
	  var _user = null;
	  var $menu = '<div id="menu">' +
	      '<div id="redSquare"></div>' +
	      '<button id="closeButton">X</button>' +
	      '<ul id="topMenu"></ul>' +
	      '</div>';

	  var setGame = function( game ) {
	    _game = game;
	    _user = game.User;
	  };

	  // TODO get the factory by it's id and get appropriate menu items
	  var getMenuItemList = function( factoryId ) {
	    var mFactory = _game.user.factories[ factoryId ];
	    var itemsArray = [];
	    if ( mFactory.material == null ) {
	      itemsArray.push( 'Material Sources' );
	    }
	    if ( mFactory.product == null ) {
	      itemsArray.push( 'Products' );
	    }
	    itemsArray.push( 'Distribution Channels' );
	    itemsArray.push( 'Programs' );
	    return itemsArray;

	  };

	  var rePaint = function() {
	    drawFactories();
	    setQuarterValue( _game.quartersPast );
	    setYearValue( _game.quartersPast );
	    setPerceptionValue( _game.getPerception() );

	  };

	  // Sets the Quarter value in the UI
	  var setQuarterValue = function( quarter ) {
	    quarter++;
	    $( '#quarterValue' ).text( quarter );
	  };

	  // Sets the Year value in the UI
	  var setYearValue = function( quarters ) {
	    var year = Math.ceil( quarters / 4 );
	    $( '#yearValue' ).text( year );
	  };

	  // Sets the "Bar Graph" value in the UI. Currently treated as a percentage
	  var setTimeProgressValue = function( percent ) {
	    $( '#timeProgressValue' ).text( percent );
	  };

	  // Sets the "Bar Graph" value in the UI. Currently treated as a percentage
	  var setPerceptionValue = function( perception ) {
	    $( '#perceptionValue' ).text( perception );
	  };

	  var setGoals = function( goals ) {
	    goals.forEach( function( goal ) {
	      $( '#goalsValue' ).append( '<div>' + goal + '</div>' );
	    } );
	  };

	  var nextTick = function() {
	  };

	  var nextQuarter = function() {
	    _game.runQuarter();
	  };

	  var drawFactories = function() {
	    console.log( 'UI Game Here' );
	    console.log( _game );
	    var factories = _game.user.factories;
	    console.log( 'Game in UI' );
	    var factoryIndex = 0;
	    factories.forEach( function( factory ) {
	      var $factoryEntity = $( '<div />',
	          {
	            class: 'factory_entity',
	            html: 'Factory ' + factoryIndex,
	            id: factoryIndex
	          } );
	      factoryIndex++;
	      $factoryEntity.click( function() {
	        $( '#menu' ).remove();
	        var currentFactoryID = this.id;
	        var menuItemList = getMenuItemList( currentFactoryID );
	        $factoryEntity.append( $menu );

	        menuItemList.forEach( function( item ) {
	          $( '#topMenu' ).append( '<li class="topMenuItem">' + item + '</li>' );
	        } );

	        $( '.topMenuItem' ).click( function( e ) {
	          var item = e.currentTarget;
	          $( '.topMenuItem' ).removeClass( 'selected' );
	          $( item ).addClass( 'selected' );
	          doSecondLevelMenu( $( item ).text(), currentFactoryID );
	          e.stopPropagation();
	        } );

	        $( '#closeButton' ).click( function( e ) {
	          $( '#menu' ).remove();
	          e.stopPropagation();
	        } );

	      } );
	      $( '#factoryContainer' ).append( $factoryEntity );
	    } );

	    var doSecondLevelMenu = function( name, currentFactoryID ) {
	      $( '#secondMenu' ).remove();
	      var $secondMenu = '<ul id="secondMenu">' +

	          '</ul>';
	      $( '#menu' ).append( $secondMenu );
	      switch ( name ){
	        case 'Material Sources' :
	          var materials = _game.materialManager.getAvailableMaterials();
	          materials.forEach( function( material, index ) {
	            $( '#secondMenu' ).append( '<li class="secondMenuItem" data-index="' + index +
	              '">' + material.name + '</li>' );
	          } );
	          $( '.secondMenuItem ' ).click( function( e ) {
	            var index = $( e.currentTarget ).data( 'index' );
	            doMaterialConfirmation( _game.materialManager.getAvailableMaterials()[ index ],
	                currentFactoryID );
	            e.stopPropagation();
	          } );
	      }
	    };

	    var doMaterialConfirmation = function( material, currentFactoryID ) {
	      if ( confirm( 'Are you sure you would like to purchase ' +
	              material.name + ' for your factory?' ) ) {
	        $( '#menu' ).remove();
	        _game.addMaterial( material, _game.user.factories[ currentFactoryID ] );
	        console.log( _game );
	      }

	    };

	  };

	  return {
	    getMenuItemList: getMenuItemList,
	    rePaint: rePaint,
	    setQuarterValue: setQuarterValue,
	    setYearValue: setYearValue,
	    setTimeProgressValue: setTimeProgressValue,
	    setPerceptionValue: setPerceptionValue,
	    setGoals: setGoals,
	    nextTick: nextTick,
	    nextQuarter: nextQuarter,
	    setGame: setGame
	  };
	} )();

	module.exports = UIInterface;


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * A Material Manager
	 */
	var MaterialManager = function( materials ) {
	  var _materials = materials;
	  var _availableMaterials = materials;

	  /**
	   * If the material is available, returns true and
	   * removes the function from the available materials
	   *
	   * Otherwise, return false.
	   */
	  var reserveMaterial = function( material ) {
	    if ( _availableMaterials != null ) {
	      for ( var index = 0; index < _availableMaterials.length; index++ ) {
	        if ( _availableMaterials[ index ] === material ) {
	          _availableMaterials.splice( index, 1 );

	          return true;
	        }
	      }
	    }

	    return false;
	  };

	  var getAvailableMaterials = function() {
	    return _availableMaterials;
	  };

	  return {
	    reserveMaterial: reserveMaterial,
	    getAvailableMaterials: getAvailableMaterials
	  };
	};

	module.exports = MaterialManager;



/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * A Product Manager
	 */
	var ProductManager = function( products ) {
	  var _products = products;
	  var _availableProducts = products;

	  var reserveProduct = function( product ) {
	    if ( _availableProducts  != null ) {
	      for ( var index = 0; index < _availableProducts.length; index++ ) {
	        if ( _availableProducts[ index ] === product ) {
	          _availableProducts.splice( index, 1 );

	          return true;
	        }
	      }
	    }

	    return false;
	  };

	  var getAvailableProducts = function() {
	    return _availableProducts;
	  };

	  return {
	    reserveProduct: reserveProduct,
	    getAvailableProducts: getAvailableProducts
	  };
	};

	module.exports = ProductManager;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * A Store Manager
	 */
	var StoreManager = function( stores ) {
	  var _stores = stores;
	  var _availableStores = stores;

	  var reserveStore = function( store ) {
	    if ( _availableStores  != null ) {
	      for ( var index = 0; index < _availableStores.length; index++ ) {
	        if ( _availableStores[ index ] === store ) {
	          _availableStores.splice( index, 1 );

	          return true;
	        }
	      }
	    }

	    return false;
	  };

	  var getAvailableStores = function() {
	    return _availableStores;
	  };

	  return {
	    reserveStore: reserveStore,
	    getAvailableStores: getAvailableStores
	  };
	};
	module.exports = StoreManager;


/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * A Factory
	 */
	var Factory = function( name, options ) {
	  options = options || {};

	  this.name = name;
	  this.product = options.product || null;
	  this.material = options.material || null;
	  this.store = options.store || null;
	  this.totalInventory = options.totalInventory || 0;
	};

	module.exports = Factory;


/***/ },
/* 8 */
/***/ function(module, exports) {

	var QuarterLog = function( paid, itemsMade, itemsSold,
	                           storePaid, storeWaste, factoryWaste ) {
	  this.paid = paid;
	  this.itemsMade = itemsMade;
	  this.itemsSold = itemsSold;
	  this.storePaid = storePaid;
	  this.storeWaste = storeWaste;
	  this.factoryWaste = factoryWaste;

	};
	module.exports = QuarterLog;


/***/ },
/* 9 */
/***/ function(module, exports) {

	var User = function( name, options ) {
	  options = options || {};

	  this.name = name;
	  this.quarterLog = options.quarterLog || [];
	  this.factories = options.factories || [];
	  this.materials = options.materials || [];
	  this.stores = options.stores || [];
	  this.totalIncome = options.totalIncome || 0;
	  this.totalWaste = options.totalWaste || 0;
	};

	module.exports = User;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var UiInterface = __webpack_require__( 3 );

	var setup = function() {
	  var $gameContainer = $( '#game-container' );
	  var $quarterYear = '<div>Quarter <span id="quarterValue">1</span> / ' +
	      'Year <span id="yearValue">0</span> ' +
	      '[<span id="timeProgressValue">1</span>]</div>';

	  var $funds = '<div>Funds $<span id="totalFundsValue">000000</span> - ' +
	      '<span id="fundsLostPerQuarterValue">0000</span> / Quarter</div>';

	  var $perception = '<div>Perception <span id="perceptionValue">1</span>00</div>';

	  var $goals = '<div id="goalsValue">Goals: <div>none</div></div>';

	  var $nextTick = $( '<button />',
	      {
	        text: 'Next Tick'
	      } );
	  $nextTick.click( function() {
	    UiInterface.nextTick();
	  } );

	  var $nextQuarter = $( '<button />',
	      {
	        text: 'Next Quarter'
	      } );
	  $nextQuarter.click( function() {
	    UiInterface.nextQuarter();
	  } );

	  $gameContainer.append( '<div id="factoryContainer"></div>' );
	  $gameContainer.append( '<hr>', $quarterYear, $funds, $perception, $goals );
	  $gameContainer.append( $nextTick, $nextQuarter );
	};

	module.exports = setup;


/***/ }
/******/ ]);