ActionPointsRule = class ActionPointsRule extends Rule {
  constructor() {
    super();

    this.baseActionPoints = 50;
  }

  calculate(companySatisfaction) {
    return companySatisfaction * this.baseActionPoints;
  }
}