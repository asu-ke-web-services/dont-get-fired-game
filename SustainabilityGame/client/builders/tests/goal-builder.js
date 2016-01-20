import {describe, it} from 'mocha';
import {expect} from 'chai';

import GoalBuilder from '../goal-builder';

describe('The goal builder', function () {
  let builder = null;

  beforeEach(function () {
    builder = new GoalBuilder();
  });

  it('can make goals', function () {
    const goal = builder.build();

    expect(typeof goal).toBe('Object');
  });

  it('fails', function () {
    expect(true).toBe(false);
  })
});
