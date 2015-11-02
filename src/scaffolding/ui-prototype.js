module.exports = function() {
  var $gameContainer = $( '#game-container' );
  var $factoryEntity = $( '<div />',
    {
      class: 'factory_entity',
      html: 'Factory'
    } );
  $gameContainer.append( $factoryEntity );
};
