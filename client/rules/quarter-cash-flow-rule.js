import Rule from './definition/rule';

export default class QuarterCashFlowRule extends Rule {
  calculate(sales, costs) {
    return sales - costs;
  }
}
