/**
 * A Production
 */
var Production = function( options ) {
  options = options || {};
  this.buildingID = options.buildingID ? options.buildingID : null;
  this.typeOfBuilding = options.typeOfBuilding ? options.typeOfBuilding : null;
  this.amount = options.amount ? options.amount : null;

  this.BuildingID = function() {
    return this.buildingID;
  };

  this.TypeOfBuilding = function() {
    return this.typeOfBuilding;
  };

  this.Amount = function() {
    return this.amount;
  };

};

module.exports = Production;
