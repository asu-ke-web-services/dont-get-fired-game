import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { default as MainHeaderBar } from '../main-header-bar.jsx';

describe('Main header bar', () => {
  const capital = 100000;
  const totalSatisfaction = 10000;
  const currentQuarter = 1;
  const totalQuarters = 10;

  const goals = {
    description: 'A Great Goal',
    capital: 100,
    satisfaction: 100
  };

  it( 'has captial, cashflow, and quarter', () => {
    const wrapper = shallow(
        <MainHeaderBar
            capital={capital}
            totalSatisfaction={totalSatisfaction}
            currentQuarter={currentQuarter}
            totalQuarters={totalQuarters}
            goals={goals}/>
    );
    expect(wrapper.contains(capital)).to.equal(true);
    expect(wrapper.contains(totalSatisfaction)).to.equal(true);
    expect(wrapper.contains(currentQuarter)).to.equal(true);
    expect(wrapper.contains(totalQuarters)).to.equal(true);
  });
});
