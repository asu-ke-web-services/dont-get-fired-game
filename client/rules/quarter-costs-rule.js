import Rule from './definition/rule';

/**
 * Calculates the total costs for the company
 */
export default class QuarterCostsRule extends Rule {
  calculate(
      costPerFactory,
      numberOfFactories,
      averageFactoryEfficiency,
      materialCosts,
      programCosts
  ) {
    var factoryCost = costPerFactory * numberOfFactories;
    var factoryMaterialCosts = (1.0 / Number(averageFactoryEfficiency)) * materialCosts;

    return factoryCost + factoryMaterialCosts + programCosts;
  }
}
