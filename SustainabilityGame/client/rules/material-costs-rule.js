import Rule from './definition/rule';

export default class MaterialCostsRule extends Rule {
  calculate(materialCostsPerSale, productionCap) {
    return materialCostsPerSale * productionCap;
  }
}
