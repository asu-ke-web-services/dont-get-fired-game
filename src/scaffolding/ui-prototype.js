var UiInterface = require( 'core/ui/ui-interface' );

var setup = function() {
  var $gameContainer = $( '#game-container' );
  var $quarterYear = '<div>Quarter <span id="quarterValue">1</span> / ' +
      'Year <span id="yearValue">0</span> ';

  var $funds = '<div>Funds $<span id="totalFundsValue">000000</span></div>';

  var $waste = '<div>Waste: <span id="wasteValue">0</span></div>';

  var $perception = '<div>Perception: <span id="perceptionValue">1</span></div>';

  // var $goals = '<div id="goalsValue">Goals: <div>none</div></div>';

  var $addFactory = $( '<button />',
      {
        text: 'Add Factory'
      } );
  $addFactory.click( function() {
    UiInterface.addNewFactory();
  } );

  var $nextQuarter = $( '<button />',
      {
        text: 'Next Quarter'
      } );

  $nextQuarter.click( function() {
    UiInterface.nextQuarter();
  } );

  $gameContainer.append( '<div id="factoryContainer"></div>' );
  $gameContainer.append( '<hr>', $quarterYear, $funds, $waste, $perception );
  $gameContainer.append( $addFactory, $nextQuarter );
};

module.exports = setup;
