import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { default as NextQuarterButton } from '../next-quarter-button.jsx';

describe('main side bar button', () => {
  const main = {
    actionPoints: '1'
  };
  it( 'has a action point', () => {
    const wrapper = shallow(<NextQuarterButton main={main} />);
    expect(wrapper.contains('1')).to.equal(true);
  });
});
