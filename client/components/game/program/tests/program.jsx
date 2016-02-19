import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { default as Program } from '../program.jsx';

describe('A Program Component', () => {
  const program = {
    name: 'Save the whales'
  };

  it( 'has a name', () => {
    const wrapper = shallow(<Program program={program} />);
    expect(wrapper.contains('Save the whales')).to.equal(true);
  });
});
