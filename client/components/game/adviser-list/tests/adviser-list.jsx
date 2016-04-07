import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { default as AdviserList } from '../adviser-list.jsx';

describe('Adviser Panel', () => {
  const advisers1 = [
    {
      name: 'Ivan',
      dialog: 'Get to work'
    }
  ];

  const advisers2 = [
    {
      name: 'Ivan',
      dialog: 'Get to work'
    },
    {
      name: 'Ryan',
      dialog: 'Hey there'
    }
  ];

  it( 'has one adviser', () => {
    const wrapper = shallow(<AdviserList advisers={advisers1} />);
    expect(wrapper.contains('Ivan')).to.equal(true);
    expect(wrapper.contains('Get to work')).to.equal(true);
    expect(wrapper.contains('Ryan')).to.equal(false);
    expect(wrapper.contains('Hey there')).to.equal(false);
  });

  it( 'has two advisers', () => {
    const wrapper = shallow(<AdviserList advisers={advisers2} />);
    expect(wrapper.contains('Ivan')).to.equal(true);
    expect(wrapper.contains('Get to work')).to.equal(true);
    expect(wrapper.contains('Ryan')).to.equal(true);
    expect(wrapper.contains('Hey there')).to.equal(true);
  });

  it( 'has no advisers', () => {
    const wrapper = shallow(<AdviserList />);

    expect(wrapper.contains('No advisers')).to.equal(true);
  });
});
