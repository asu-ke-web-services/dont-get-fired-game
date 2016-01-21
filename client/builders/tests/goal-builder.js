import {describe, it, beforeEach} from 'mocha';
import {expect} from 'chai';

import GoalBuilder from '../goal-builder';

describe('The goal builder', function () {
  let builder = null;

  beforeEach(function () {
    builder = new GoalBuilder();
  });

  it('can make goals', function () {
    const goal = builder.build();

    expect(typeof goal).to.be.equal('object');
    expect(goal.constructor.name).to.be.equal('Goal');
  });

});
