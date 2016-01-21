import {default as Rule} from './definition/rule';

export default class ActionPointsRule extends Rule {
  constructor() {
    super();

    this.baseActionPoints = 50;
  }

  calculate(companySatisfaction) {
    return companySatisfaction * this.baseActionPoints;
  }
}
