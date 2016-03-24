import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { default as MainHeaderBar } from '../main-header-bar.jsx';

describe('Main header bar', () => {
  const capital = 100000;
  const capitalPerQuarter = 10000;
  const currentQuarter = 1;
  const totalQuarters = 10;
  it( 'has captial, cashflow, and quarter', () => {
    const wrapper = shallow(
        <MainHeaderBar
            capital={capital}
            capitalPerQuarter={capitalPerQuarter}
            currentQuarter={currentQuarter}
            totalQuarters={totalQuarters}/>
    );
    expect(wrapper.contains(capital)).to.equal(true);
    expect(wrapper.contains(capitalPerQuarter)).to.equal(true);
    expect(wrapper.contains(currentQuarter)).to.equal(true);
    expect(wrapper.contains(totalQuarters)).to.equal(true);
  });
});
