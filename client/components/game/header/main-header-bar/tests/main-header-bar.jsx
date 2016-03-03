import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { default as MainHeaderBar } from '../main-header-bar.jsx';

describe('Main header bar', () => {
  const capital = 100000;
  const cashFlow = 10000;
  const quarter = 1;

  it( 'has captial, cashflow, and quarter', () => {
    const wrapper = shallow(
        <MainHeaderBar
            capital={capital}
            cashFlow={cashFlow}
            quarter={quarter}/>
    );
    expect(wrapper.contains(capital)).to.equal(true);
    expect(wrapper.contains(cashFlow)).to.equal(true);
    expect(wrapper.contains(quarter)).to.equal(true);
  });
});
