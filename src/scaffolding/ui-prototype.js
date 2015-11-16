var uiInterface = require( './src/core/ui-interface.js' );
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
