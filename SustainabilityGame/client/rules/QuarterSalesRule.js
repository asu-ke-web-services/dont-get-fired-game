QuarterSalesRule = class QuarterSalesRule extends Rule {
  calculate(percentageOfMarketPenetration, marketSizeInDollars, maximumOutputPerFactory, averageFactoryEffeciency, numberOfFactories) {
    return Math.min(
      percentageOfMarketPenetration * marketSizeInDollars,
      maximumOutputPerFactory * averageFactoryEffeciency * numberOfFactories
    )
  }
}