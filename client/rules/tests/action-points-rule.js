import {describe, it} from 'mocha';
import {expect} from 'chai';

import ActionPointsRule from '../action-points-rule';

describe( 'The Action Points Rule', function () {
  it( 'Returns at most 50', function () {
    let rule = new ActionPointsRule();

    expect(rule.calculate(0)).to.be.at.most(50);
    expect(rule.calculate(0.5)).to.be.at.most(50);
    expect(rule.calculate(1)).to.be.at.most(50);
  } );
} );
