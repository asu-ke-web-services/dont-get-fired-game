MaterialCostsRule = class MaterialCostsRule extends Rule {
  calculate(materialCostsPerSale, productionCap) {
    return materialCostsPerSale * productionCap;
  }
}
