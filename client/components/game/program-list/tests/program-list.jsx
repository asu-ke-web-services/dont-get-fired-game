import React from 'react';
import {expect} from 'chai';
import {render} from 'enzyme';
const {describe, it} = global;

import { default as ProgramList } from '../program-list.jsx';

describe('A Program List Component', () => {
  const programs = [{
    name: 'Save the whales'
  }, {
    name: 'Pet all cats'
  }];

  /**
   * Note, using render instead of shallow render
   */
  it( 'has name', () => {
    const wrapper = render(<ProgramList programs={programs} />);
    expect(wrapper.text()).to.contain('Save the whales');
    expect(wrapper.text()).to.contain('Pet all cats');
  });
});
