MarketSizeRule = class MarketSizeRule extends Rule {
  calculate(potentialSalesPerQuarter, initialRevenuePerSale) {
    return potentialSalesPerQuarter * initialRevenuePerSale;
  }
}
