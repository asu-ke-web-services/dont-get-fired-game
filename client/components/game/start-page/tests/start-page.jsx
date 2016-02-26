import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { default as Page } from '../start-page.jsx';

describe('A start-page has buttons', () => {

  it( 'has new game button', () => {
    const wrapper = shallow(<Page />);
    expect(wrapper.contains('new game')).to.equal(true);
  });
});
