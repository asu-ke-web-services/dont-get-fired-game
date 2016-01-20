import Rule from './definition/rule';

export default class MarketSizeRule extends Rule {
  calculate(potentialSalesPerQuarter, initialRevenuePerSale) {
    return potentialSalesPerQuarter * initialRevenuePerSale;
  }
}
