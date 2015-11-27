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
	var setup = __webpack_require__( 9 );

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
	var MaterialManager = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
	var ProductManager = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
	var StoreManager = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
	var Factory = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
	var QuarterLog = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	var UIInterface = ( function() {
	  var _game = null;

	  var setGame = function( game ) {
	    _game = game;
	  };

	  // TODO get the factory by it's id and get appropriate menu items
	  var getMenuItemList = function( factoryId ) {
	    var mFactory = getFactoryById( factoryId );
	    return itemsArray;

	  };

	  var rePaint = function() {

	    // var currentGameState = game;
	    this.setQuarterValue( currentGameState.quartersPast );
	    this.setYearValue( currentGameState.quartersPast );
	    this.setPerceptionValue( currentGameState.getPerception() );
	    this.setGoals( currentGameState.getGoals() );
	  };

	  // Sets the Quarter value in the UI
	  var setQuarterValue = function( quarter ) {
	    quarter++;
	    $( '#quarterValue' ).text( quarter );
	  };

	  // Sets the Year value in the UI
	  var setYearValue = function( quarters ) {
	    var year = quarters / 4;
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

	    // call next Tick;
	  };

	  var nextQuarter = function() {

	    // game.runQuarter();
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

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 4;


/***/ },
/* 5 */
/***/ function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 5;


/***/ },
/* 6 */
/***/ function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 6;


/***/ },
/* 7 */
/***/ function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 7;


/***/ },
/* 8 */
/***/ function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 8;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var UiInterface = __webpack_require__( 3 );

	var setup = function() {
	  var $gameContainer = $( '#game-container' );
	  var $factoryEntity = $( '<div />',
	      {
	        class: 'factory_entity',
	        html: 'Factory',
	        id: 'initialFactory'
	      } );

	  $factoryEntity.click( function() {
	    var menuItemList = getMenuItemList( this.id );
	  } );

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

	  $gameContainer.append( $factoryEntity, '<hr>', $quarterYear, $funds, $perception, $goals );
	  $gameContainer.append( $nextTick, $nextQuarter );
	};

	module.exports = setup;


/***/ }
/******/ ]);