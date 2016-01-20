import Strategy from './definition/strategy';

export default class PointDistributionStrategy extends Strategy {
  constructor( numberOfBins, maxPoints ) {
    super();

    this.numberOfBins = numberOfBins;
    this.maxPoints = maxPoints;
  }

  // TODO actually implement a good algorithm here
  execute() {
    let bins = [];

    for ( let i = 0; i < this.numberOfBins; i++ ) {
      bins[i] = this.maxPoints / Number( this.numberOfBins );
    }

    return bins;
  }
}
