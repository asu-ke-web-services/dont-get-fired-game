var UIInterface = {

  //todo: get the factory by it's id and get appropriate menu items
  getMenuItemList: function( factoryId )
  {
    var mFactory = getFactoryById( factoryId );
    return itemsArray;

  },

  rePaint: function() {

    //var currentGameState = game;
    this.setQuarterValue( currentGameState.quartersPast );
    this.setYearValue( currentGameState.quartersPast );
    this.setPerceptionValue( currentGameState.getPerception() );
    this.setGoals( currentGameState.getGoals() );
  },

  //Sets the Quarter value in the UI
  setQuarterValue: function( quarter ) {
    quarter++;
    $( '#quarterValue' ).text( quarter );
  },

  //Sets the Year value in the UI
  setYearValue: function( quarters ) {
    var year = quarters / 4;
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

  setGoals: function( goals ) {
    goals.forEach( function( goal ) {
      $( '#goalsValue' ).append( '<div>' + goal + '</div>' );
    } );
  },

  nextTick: function() {

    //call next Tick;
  },

  nextQuarter: function() {

    //game.runQuarter();
  }
};

module.exports = UIInterface;
