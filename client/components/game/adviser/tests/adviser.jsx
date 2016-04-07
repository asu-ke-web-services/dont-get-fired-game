import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { default as Main } from '../adviser.jsx';

describe('adviser text bubble', () => {
  const main = {
    text: 'RedFox inc',
  };

  it( 'has a texts', () => {
    const wrapper = shallow(<Main main={main} />);
    expect(wrapper.contains('RedFox inc')).to.equal(true);
  });
});

