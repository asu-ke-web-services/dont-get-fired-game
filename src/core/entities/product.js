var Product = function( name, setupCost, regMaterialTypes, totalMaterialsNeeded, totalOuput ) {
  this.name = name;
  this.setupCost =  setupCost;
  this.regMaterialTypes =  regMaterialTypes;
  this.totalMaterialsNeeded =  totalMaterialsNeeded;
  this.totalOuput =  totalOuput;
};
module.exports = Product;
