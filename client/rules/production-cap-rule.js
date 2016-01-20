import Rule from './definition/rule';

export default class ProductionCapRule extends Rule {
  calculate(
      potentialSalesPerQuarter,
      marketPenetration,
      averageFactoryEfficiency,
      numberOfFactories,
      maximumOutputPerFactory
  ) {
    return Math.min(
      potentialSalesPerQuarter * marketPenetration,
      averageFactoryEfficiency * maximumOutputPerFactory * numberOfFactories
    );
  }
}
