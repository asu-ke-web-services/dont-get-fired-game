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
