import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { default as Event } from '../eventPage.jsx';

describe('Event Page', () => {
  const event = {
    name: 'production',
    explain: 'Food is bad',
    options: 'Options'
  };

  it( 'has a name', () => {
    const wrapper = shallow(<Event event={event} />);
    expect(wrapper.contains('production')).to.equal(true);
  });
  it( 'has options', () => {
    const wrapper = shallow(<Event event={event} />);
    expect(wrapper.contains('Food is bad')).to.equal(true);
  });
  it( 'has explanation', () => {
    const wrapper = shallow(<Event event={event} />);
    expect(wrapper.contains('Options')).to.equal(true);
  });
});
