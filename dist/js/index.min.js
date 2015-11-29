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

	var Game = __webpack_require__( !(function webpackMissingModule() { var e = new Error("Cannot find module \"core/entities/game\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()) );

	var init = function() {
	  var game = new Game();
	  game.createGame();
	};

	module.exports = init;


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var UiInterface = __webpack_require__( 4 );

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


/***/ },
/* 4 */
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


/***/ }
/******/ ]);