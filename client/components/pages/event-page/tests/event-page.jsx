import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { EventPage } from '../event-page.jsx';

describe('Event Page', () => {
  const name = 'production';
  const explain = 'Food is bad';
  const options = 'Options';

  it( 'has a name', () => {
    const wrapper = shallow(<EventPage name={name} />);
    expect(wrapper.contains('production')).to.equal(true);
  });
  it( 'has options', () => {
    const wrapper = shallow(<EventPage explain={explain} />);
    expect(wrapper.contains('Food is bad')).to.equal(true);
  });
  it( 'has explanation', () => {
    const wrapper = shallow(<EventPage options={options} />);
    expect(wrapper.contains('Options')).to.equal(true);
  });
});

