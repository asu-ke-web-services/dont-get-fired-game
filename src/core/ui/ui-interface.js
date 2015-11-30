
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
    if ( mFactory.store == null ) {
      itemsArray.push( 'Distribution Channels' );
    }
    if ( itemsArray.length == 0 ) {
      itemsArray.push( 'No Options Available' );
    }

    return itemsArray;

  };

  var rePaint = function() {
    drawFactories();
    setQuarterValue( _game.quartersPast );
    setYearValue( _game.quartersPast );
    setPerceptionValue( _game.getPerception() );
    setIncomeValue( _game.user.totalIncome );
    setWasteValue( _game.user.totalWaste );
  };

  var setWasteValue = function( totalWaste ) {
    $( '#wasteValue' ).text( totalWaste );
  };

  var setIncomeValue = function( income ) {
    $( '#totalFundsValue' ).text( income );
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
    $( '#factoryContainer' ).empty();
    console.log( 'UI Game Here' );
    console.log( _game );
    var factories = _game.user.factories;
    console.log( 'Game in UI' );
    var factoryIndex = 0;
    factories.forEach( function( factory ) {
      var factoryProduct = factory.product == null ? 'none' : factory.product.name;
      var factoryMaterial = factory.material == null ? 'none' : factory.material.name;
      var factoryStore = factory.store == null ? 'none' : factory.store.name;
      var $factoryEntity = $( '<div />',
          {
            class: 'factory_entity',
            html: '<span>Factory ' + factoryIndex + '</span>' +
            '<span><b>Product:</b> ' + factoryProduct + '</span><br>' +
            '<span><b>Material:</b> ' + factoryMaterial + '</span><br>' +
            '<span><b>Store:</b> ' + factoryStore + '</span><br>',
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
          break;

        case 'Products' :
          var products = _game.productManager.getAvailableProducts();
          products.forEach( function( product, index ) {
            $( '#secondMenu' ).append( '<li class="secondMenuItem" data-index="' + index +
                '">' + product.name + '</li>' );
          } );
          $( '.secondMenuItem ' ).click( function( e ) {
            var index = $( e.currentTarget ).data( 'index' );
            doProductConfirmation( _game.productManager.getAvailableProducts()[ index ],
                currentFactoryID );
            e.stopPropagation();
          } );
          break;

        case 'Distribution Channels' :
          var stores = _game.storeManager.getAvailableStores();
          stores.forEach( function( store, index ) {
            $( '#secondMenu' ).append( '<li class="secondMenuItem" data-index="' + index +
                '">' + store.name + '</li>' );
          } );
          $( '.secondMenuItem ' ).click( function( e ) {
            var index = $( e.currentTarget ).data( 'index' );
            doStoreConfirmation( _game.storeManager.getAvailableStores()[ index ],
                currentFactoryID );
            e.stopPropagation();
          } );
          break;
      }
    };

    var doMaterialConfirmation = function( material, currentFactoryID ) {
      if ( confirm( 'Are you sure you would like to purchase ' +
              material.name + ' for your factory?' +
              '\n\n Cost Per Pound: $' + material.costPerPound +
              '\n\n Waste Per Pound: ' + material.wastePerPound
          ) ) {
        $( '#menu' ).remove();
        _game.addMaterial( material, _game.user.factories[ currentFactoryID ] );
        console.log( _game );
      }

    };

    var doProductConfirmation = function( product, currentFactoryID ) {
      var mFactory = _game.user.factories[ currentFactoryID ];
      if ( confirm( 'Are you sure you would like to purchase ' +
              product.name + ' for your factory?' +
              '\n\n Setup Cost: $' + product.setupCost +
              '\n\n Material Required: ' + product.materialDependency.name +
              '\n\n Output: ' + product.totalOutput + ' units'
          ) ) {
        $( '#menu' ).remove();
        if ( mFactory.material == null ||
            mFactory.material.name != product.materialDependency.name ) {
          alert( 'Error: This product can not be made without Material: ' +
              product.materialDependency.name + '.' );
          return;
        }

        if ( _game.addProduct( product, mFactory ) == false ) {
          alert( 'Error: You do not have enough money to setup this product' );
        }

        console.log( _game );
      }

    };

    var doStoreConfirmation = function( store, currentFactoryID ) {
      var mFactory = _game.user.factories[ currentFactoryID ];
      if ( confirm( 'Are you sure you would like to purchase ' +
              store.name + ' for your factory?' +
              '\n\n Product Required: ' + store.product +
              '\n\n Price per Product: $' + store.pricePerProduct +
              '\n\n Base Buy Rate: $' + store.baseBuyRateForProducts +
              '\n\n Waste per Product: ' + store.wastePerProduct
          ) ) {
        $( '#menu' ).remove();
        if ( mFactory.product == null || mFactory.product.name != store.product ) {
          alert( 'Error: This Store can not be contracted without Product: ' +
              store.product + '.' );
          return;
        }

        if ( _game.addStore( store, mFactory ) == false ) {
          alert( 'Error: You do not have enough money to setup this product' );
        }

        console.log( _game );
      }
      console.log( store );
    };
  };

  var addNewFactory = function() {
    if ( !_game.addFactory() ) {
      alert( 'Error: You do not have enough money to purcahse a new Factory.' );
    }
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
    setGame: setGame,
    addNewFactory: addNewFactory
  };
} )();

module.exports = UIInterface;
