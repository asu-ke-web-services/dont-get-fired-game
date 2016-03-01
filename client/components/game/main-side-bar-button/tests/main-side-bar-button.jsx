import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { default as Main } from '../main-side-bar-button.jsx';

describe('main side bar button', () => {
  const main = {
    actionPoint: 1,
  };

  it( 'has a action point', () => {
    const wrapper = shallow(<Main main={main} />);
    expect(wrapper.contains(1)).to.equal(true);
  });
});

