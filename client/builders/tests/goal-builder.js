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

  it('can make goals from options', function () {
    builder.setFromOptions({
      name: 'test'
    });

    const goal = builder.build();

    expect(goal.name).to.be.equal('test');
  });

  it('can set the name and description', function () {
    builder.setName( 'test' );
    builder.setDescription( 'test description' );

    const goal = builder.build();

    expect(goal.name).to.be.equal('test');
    expect(goal.description).to.be.equal('test description');
  });
});
