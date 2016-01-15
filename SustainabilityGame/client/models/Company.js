Company = class Company {
  constructor(options) {
    this.name = options.name;
    this.capital = options.capital;
    this.industry = options.industry;
    this.goal = options.goal;
    this.marketPenetration = options.marketPenetration;
    this.numberOfFactories = options.numberOfFactories;
    this.averageFactoryEfficiency = options.averageFactoryEfficiency;
    this.programCosts = options.programCosts;
    this.companySatisfaction = options.companySatisfaction;
    this.customerSatisfaction = options.customerSatisfaction;

    this.actionPointsRule = new ActionPointsRule();
    this.productionCapRule = new ProductionCapRule();
    this.materialCostsRule = new MaterialCostsRule();
    this.salesRule = new QuarterSalesRule();
    this.costsRule = new QuarterCostsRule();
    this.cashFlowRule = new QuarterCashFlowRule();
  }

  addFactory() {
    // TODO descrease cash
    // TODO add a factory
  }

  getCalculatedMetrics() {
    let actionPoints = this.actionPointsRule.calculate(
        this.companySatisfaction
    );
    let productionCap = this.productionCapRule.calculate(
        this.industry.potentialSalesPerQuarter,
        this.marketPenetration,
        this.averageFactoryEfficiency,
        this.numberOfFactories,
        this.industry.maximumOutputPerFactory
    );
    let sales = this.salesRule.calculate(
        this.marketPenetration,
        this.industry.getCalculatedMetrics().marketSizeInDollars,
        this.industry.maximumOutputPerFactory,
        this.averageFactoryEfficiency,
        this.numberOfFactories
    );
    let costs = this.costsRule.calculate(
        this.industry.quarterCostPerFactory,
        this.numberOfFactories,
        this.averageFactoryEfficiency,
        this.materialCostsRule.calculate(
            this.industry.materialCostsPerSale,
            productionCap
        ),
        this.programCosts
    );
    let cashFlow = this.cashFlowRule.calculate(
        sales,
        costs
    );
    // TODO calculate waste

    return {
      actionPoints: actionPoints,
      productionCap: productionCap,
      sales: sales,
      costs: costs,
      cashFlow: cashFlow
    }
  }
}
