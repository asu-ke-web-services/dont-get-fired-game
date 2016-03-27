import Strategy from './definition/strategy';

export default class PointDistributionStrategy extends Strategy {
  constructor( numberOfBins, maxPoints ) {
    super();

    this.numberOfBins = numberOfBins;
    this.maxPoints = maxPoints;
  }

  execute() {
    let bins = [];
    let temp = this.getRandom(1, this.maxPoints);

    for ( let i = 0; i < this.numberOfBins; i++ ) {
      bins[i] = temp;
      let localMax = this.maxPoints-temp;
      temp = this.getRandom(1, localMax);
    }

    return bins;
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * ( max - min ) + min);
  }
}
