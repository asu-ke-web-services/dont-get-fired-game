QuarterCustomerPerceptionStrategy = class QuarterCustomerPerceptionStrategy extends Strategy {
  constructor(numberOfItemsMade, factoryWaste) {
    super();

    this.numberOfItemsMade = numberOfItemsMade;
    this.factoryWaste = factoryWaste;

    this.mapOfPerception = [
      {min: 0, max: 0.00001, out: 1.0},
      {min: 0.00001, max: 0.1, out: .9},
      {min: 0.1, max: 0.2, out: .8},
      {min: 0.2, max: 0.3, out: .7},
      {min: 0.3, max: 0.4, out: .6},
      {min: 0.4, max: 0.5, out: .5},
      {min: 0.5, max: 0.6, out: .4},
      {min: 0.6, max: 0.8, out: .3},
      {min: 0.8, max: 0.9999 , out: .1},
      {min: 1, max: Number.MAX_VALUE, out: 0}
    ];
  }

  execute() {
    let factoryRate = 0;

    if (this.numberOfItemsMade != 0) {
      factoryRate = this.factoryWaste / this.numberOfItemsMade;
    }

    let wasteRate = factoryRate;

    return this.mapOfPerception.filter(function (mapper) {
      if (mapper.min <= wasteRate && mapper.max > wasteRate) {
        return true;
      } else {
        return false
      }
    })[0].out;
  }
}