import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { default as Report } from '../final-report.jsx';

describe('Final report page', () => {
  const report = {
    name: 'production',
    accomplishments: '20% increase in production',
    goal: 'Win with in 5min'
  };

  it( 'has a name', () => {
    const wrapper = shallow(<Report report={report} />);
    expect(wrapper.contains('production')).to.equal(true);
  });

  it( 'has accomplishments', () => {
    const wrapper = shallow(<Report report={report} />);
    expect(wrapper.contains('20% increase in production')).to.equal(true);
  });

  it( 'has goal', () => {
    const wrapper = shallow(<Report report={report} />);
    expect(wrapper.contains('Win with in 5min')).to.equal(true);
  });
});
