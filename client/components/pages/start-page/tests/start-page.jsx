import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { StartPage } from '../start-page.jsx';

describe('The Start Page', () => {

  it( 'has new game button', () => {
    const wrapper = shallow(<StartPage />);
    expect(wrapper.contains('new game')).to.equal(true);
  });
});
