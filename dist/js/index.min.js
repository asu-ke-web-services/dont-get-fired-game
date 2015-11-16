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

	var game = __webpack_require__( 1 );
	var setup = __webpack_require__( 2 );
	var uiInterface = __webpack_require__( 3 );
	uiInterface();
	setup();
	game();



/***/ },
/* 1 */
/***/ function(module, exports) {

	var gameStates = {};

	module.exports = function game() {

	  // TODO Game init
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var uiInterface = __webpack_require__( !(function webpackMissingModule() { var e = new Error("Cannot find module \"./src/core/ui-interface.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()) );
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
/* 3 */
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