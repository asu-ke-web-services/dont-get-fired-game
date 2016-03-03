import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { default as QuaterReport } from '../quater-report.jsx';

describe('Quater Report Page', () => {
  const quater = {
    quaterNumber: '1',
    quaterResult: '20% increase in production',
    quaterState: 'losing income',
    nextQuaterState: 'income increase'
  };

  it( 'has a quater number', () => {
    const wrapper = shallow(<QuaterReport quater={quater} />);
    expect(wrapper.contains('1')).to.equal(true);
  });

  it( 'has quater result', () => {
    const wrapper = shallow(<QuaterReport quater={quater} />);
    expect(wrapper.contains('20% increase in production')).to.equal(true);
  });

  it( 'has game state', () => {
    const wrapper = shallow(<QuaterReport quater={quater} />);
    expect(wrapper.contains('losing income')).to.equal(true);
  });

  it( 'has next game state', () => {
    const wrapper = shallow(<QuaterReport quater={quater} />);
    expect(wrapper.contains('income increase')).to.equal(true);
  });
});
