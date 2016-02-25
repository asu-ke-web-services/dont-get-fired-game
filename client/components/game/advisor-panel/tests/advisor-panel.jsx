import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { default as AdvisorPanel } from '../advisor-panel.jsx';

describe('Advisor Panel', () => {
  const advisors1 = [
    {
      name: 'Ivan',
      dialog: 'Get to work'
    }
  ];

  const advisors2 = [
    {
      name: 'Ivan',
      dialog: 'Get to work'
    },
    {
      name: 'Ryan',
      dialog: 'Hey there'
    }
  ];

  it( 'has one advisor', () => {
    const wrapper = shallow(<AdvisorPanel advisors={advisors1} />);
    expect(wrapper.contains('Ivan')).to.equal(true);
    expect(wrapper.contains('Get to work')).to.equal(true);
    expect(wrapper.contains('Ryan')).to.equal(false);
    expect(wrapper.contains('Hey there')).to.equal(false);
  });

  it( 'has two advisors', () => {
    const wrapper = shallow(<AdvisorPanel advisors={advisors2} />);
    expect(wrapper.contains('Ivan')).to.equal(true);
    expect(wrapper.contains('Get to work')).to.equal(true);
    expect(wrapper.contains('Ryan')).to.equal(true);
    expect(wrapper.contains('Hey there')).to.equal(true);
  });

  it ( 'has no advisors', () => {
    const wrapper = shallow(<AdvisorPanel />);

    expect(wrapper.contains('No advisors')).to.equal(true);
  });
});
