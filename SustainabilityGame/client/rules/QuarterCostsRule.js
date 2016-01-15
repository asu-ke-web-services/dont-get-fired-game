/**
 * Calculates the total costs for the company 
 */
QuarterCostsRule = class QuarterCostsRule extends Rule {
  calculate(costPerFactory, numberOfFactories, averageFactoryEfficiency, materialCosts, programCosts) {
    var factoryCost = costPerFactory * numberOfFactories;
    var factoryMaterialCosts = (1.0 / (averageFactoryEfficiency * 1.0)) * materialCosts;

    return factoryCost + factoryMaterialCosts + programCosts;
  }
}
