var UiInterface = require( 'core/ui/ui-interface' );

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
