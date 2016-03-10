import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { default as MainActionAreaWindow } from '../main-action-area-window.jsx';


describe('A Program Selected', () => {
  const selectedProgram = {
    name: 'Save the whales',
    shortDescription: 'Save the whales is da best thing ever',
    cost: 100,
    additional: 'Save the whales will make you a better person'
  };
  const programs = [ {
    name: 'Save the whales',
    shortDescription: 'Save the whales is da best thing ever',
    cost: 100,
    additional: 'Save the whales will make you a better person'
  }, {
    name: 'Save the cats',
    shortDescription: 'Save the cats is da best thing ever',
    cost: 100,
    additional: 'Save the cats will make you a better person'
  } ];
  it( 'has a name', () => {
    const wrapper = shallow(<MainActionAreaWindow programs={programs}
    selectedProgram={selectedProgram} />);
    expect(wrapper.contains('Save the whales')).to.equal(false);
  });

});

describe('A Program Is Not Selected', () => {
  const selectedProgram = null;

  const programs = [ {
    name: 'Save the whales',
    shortDescription: 'Save the whales is da best thing ever',
    cost: 100,
    additional: 'Save the whales will make you a better person'
  }, {
    name: 'Save the cats',
    shortDescription: 'Save the cats is da best thing ever',
    cost: 100,
    additional: 'Save the cats will make you a better person'
  } ];

  it( 'has a name', () => {
    const wrapper = shallow(<MainActionAreaWindow
    programs={programs} selectedProgram={selectedProgram} />);
    expect(wrapper.contains('Save the cats')).to.equal(false);
  });
});
