import Builder from './definition/builder';
import Industry from '../models/industry';

/**
 * The Industry Builder allows you to lazily build
 * industries.
 *
 * @type {Builder}
 */
export default class IndustryBuilder extends Builder {
  constructor() {
    super();

    this.options = {};
    this.options.potentialSalesPerQuarter = 0;
    this.options.initialRevenuePerSale = 0;
    this.options.initialCostPerFactory = 0;
    this.options.quarterCostPerFactory = 0;
    this.options.maximumOutputPerFactory = 0;
    this.options.materialCostsPerSale = 0;
    this.options.wastePerSale = 1;
    this.options.comments = '';
  }

  setPotentialSalesPerQuarter( potential ) {
    this.options.potentialSalesPerQuarter = potential;
  }

  setInitialRevenuePerSale( initial ) {
    this.options.initialRevenuePerSale = initial;
  }

  setInitialCostPerFactory( initial ) {
    this.options.initialCostPerFactory = initial;
  }

  setQuarterCostPerFactory( cost ) {
    this.options.quarterCostPerFactory = cost;
  }

  setMaximumOutputPerFactory( output ) {
    this.options.maximumOutputPerFactory = output;
  }

  setMaterialCostsPerSale( costs ) {
    this.options.materialCostsPerSale = costs;
  }

  setWastePerSale( wastePerSale ) {
    this.options.wastePerSale = wastePerSale;
  }

  setComment( comment ) {
    this.options.comment = comment;
  }

  setFromOptions( options ) {
    this.options = {
      ...this.options,
      ...options
    };
  }

  /**
   * @override
   * @return {Industry}
   */
  build() {
    return new Industry( this.options );
  }
}
