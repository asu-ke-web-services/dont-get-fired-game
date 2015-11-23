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
	var setup = __webpack_require__( 3 );

	setup();
	game();



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__( 2 );

	var gameStates = {};

	var sustainabilityGame;
	module.exports = function game() {
	  sustainabilityGame = new Game( );
	  sustainabilityGame.createGame();
	  sustainabilityGame.createGame();
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

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
	    $.getJSON( 'game/data.json', function( data ) {
	      this.materialManager = new materialManager( data.Materials );
	      this.productManager = new productManager( data.Products );
	      this.storeManager = new storeManager( data.Stores );
	    } );
	  };

	  //Add [Contains Game Logic]
	  this.addMaterial = function( material, factory ) {
	    var mat = materialManager.getMaterial( material );
	    if ( mat == null ) {
	      return false;
	    } else {
	      factory.material = material;
	      user.materials.push( material );

	      //Update UI

	      return true;
	    }
	  };
	  this.addProduct = function( product, factory ) {

	    var pro = productManager.getProduct( product );
	    if ( pro == null ) {
	      return false;
	    } else {
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
	    if ( sto == null ) {
	      return false;
	    } else {
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var uiInterface = __webpack_require__( 4 );
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

	var $goals = '<div>Goals: <div id="goalsValue">none</div></div>';

	$gameContainer.append( $factoryEntity, '<hr>', $quarterYear, $funds, $perception, $goals );
	uiInterface.addGoal( 'Goal 1' );
	uiInterface.addGoal( 'Goal 2' );


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {

	  //todo: get the factory by it's id and get appropriate menu items
	  getMenuItemList: function( factoryId )
	  {
	    var mFactory = getFactoryById( factoryId );
	    return itemsArray;

	  },

	  //Sets the Quarter value in the UI
	  setQuarterValue: function( quarter ) {
	    $( '#quarterValue' ).text( quarter );
	  },

	  //Sets the Year value in the UI
	  setYearValue: function( year ) {
	    $( '#yearValue' ).text( year );
	  },

	  //Sets the "Bar Graph" value in the UI. Currently treated as a percentage
	  setTimeProgressValue: function( percent ) {
	    $( '#timeProgressValue' ).text( percent );
	  },

	  //Sets the "Bar Graph" value in the UI. Currently treated as a percentage
	  setPerceptionValue: function( perception ) {
	    $( '#perceptionValue' ).text( perception );
	  },

	  addGoal: function( goal ) {
	    $( '#goalsValue' ).append( goal + '<br>' );
	  }
	};


/***/ }
/******/ ]);