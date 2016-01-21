import {describe, it} from 'mocha';
import {expect} from 'chai';

import MarketSizeRule from '../market-size-rule';

describe( 'The Market Size Rule', function () {
  it( 'Returns market size', function () {
    const testValues = [
      {potentialSales: 1000000, revenuePerSale: 1, expect: 1000000},
      {potentialSales: 1000000, revenuePerSale: 0.1, expect: 100000},
      {potentialSales: 1000000, revenuePerSale: 0.01, expect: 10000},
    ];

    testValues.forEach( ( values ) => {
      const rule = new MarketSizeRule();
      const calc = rule.calculate(values.potentialSales, values.revenuePerSale);

      expect(calc).to.be.equal(values.expect);
    } );
  } );
} );
