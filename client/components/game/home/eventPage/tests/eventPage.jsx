import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { default as Event } from '../eventPage.jsx';

describe('Event Page', () => {
  const event = {
    options: 'Option 1 or Options 2'
  };

  it( 'has options', () => {
    const wrapper = shallow(<Event event={event} />);
    expect(wrapper.contains('production')).to.equal(true);
  });
});
