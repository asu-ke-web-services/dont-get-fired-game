import React from 'react';
import {expect} from 'chai';
import {shallow,render} from 'enzyme';
const {describe, it} = global;

import { default as MainActionAreaWindow } from '../main-action-area-window.jsx';


describe('No Programs Exist', () => {

  const selectedProgram = null;
  const programs = null;

  it( 'has a name', () => {
    const wrapper = shallow(<MainActionAreaWindow selectedProgram={selectedProgram}
                                                  programs={programs}/>);
    expect(wrapper.contains('No Programs Exist')).to.equal(true);
  });
});

describe('A Program Selected', () => {

  const selectedProgram = {
    name: 'Save the whales',
    shortDescription: 'Save the whales is da best thing ever',
    cost: 100,
    additional: 'Save the whales will make you a better person',
    image: 'abc',
    actionPointValue: 'egh'
  };
  const programs = [ {
    name: 'Save the whales',
    shortDescription: 'Save the whales is da best thing ever',
    cost: 100,
    additional: 'Save the whales will make you a better person',
    image: 'abc',
    actionPointValue: 'egh'
  }, {
    name: 'Save the Bears',
    shortDescription: 'Save the bears is da best thing ever',
    cost: 100,
    additional: 'Save the bears will make you a better person',
    image: 'abc',
    actionPointValue: 'egh'
  } ];

  it( 'has a name', () => {
    const wrapper = render(<MainActionAreaWindow selectedProgram={selectedProgram}
                                                 programs={programs}/>);
    // console.log(wrapper.text());
    expect(wrapper.text()).to.contain('Save the whales');
  });
});
describe('A Program Is Not Selected', () => {

  const selectedProgram = null;
  const programs = [ {
    name: 'Save the whales',
    shortDescription: 'Save the whales is da best thing ever',
    cost: 100,
    additional: 'Save the whales will make you a better person',
    image: 'abc',
    actionPointValue: 'egh'
  }, {
    name: 'Save the Bears',
    shortDescription: 'Save the bears is da best thing ever',
    cost: 100,
    additional: 'Save the bears will make you a better person',
    image: 'abc',
    actionPointValue: 'egh'
  } ];

  it( 'list item has a name', () => {
    const wrapper = render(<MainActionAreaWindow selectedProgram={selectedProgram}
                                                 programs={programs}/>);
    // console.log(wrapper.text());
    expect(wrapper.text()).to.contain('Save the Bears');
  });
});
