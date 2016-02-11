import MarketSizeRule from '../rules/market-size-rule';

export default class Industry {
  constructor(options) {
    this.name = options.name;
    this.potentialSalesPerQuarter = options.potentialSalesPerQuarter;
    this.initialRevenuePerSale = options.initialRevenuePerSale;
    this.initialCostPerFactory = options.initialCostPerFactory;
    this.quarterCostPerFactory = options.quarterCostPerFactory;
    this.maximumOutputPerFactory = options.maximumOutputPerFactory;
    this.materialCostsPerSale = options.materialCostsPerSale;
    this.wastePerSale = options.wastePerSale;
    this.comments = options.comments;

    this.marketSizeRule = new MarketSizeRule();
  }

  getCalculatedMetrics() {
    let marketSize = this.marketSizeRule.calculate(
        this.potentialSalesPerQuarter,
        this.initialRevenuePerSale
    );

    return {
      marketSizeInDollars: marketSize
    };
  }
}
