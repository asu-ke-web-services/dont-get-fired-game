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
