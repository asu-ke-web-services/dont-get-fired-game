import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { default as ProgramListItem } from '../program-list-item.jsx';

describe('A Program List Item Component', () => {
  const program = {
    name: 'Save the whales'
  };

  it( 'has a name', () => {
    const wrapper = shallow(<ProgramListItem program={program} />);
    expect(wrapper.contains('Save the whales')).to.equal(true);
  });
});
