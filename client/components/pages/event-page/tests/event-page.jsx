import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { EventPage } from '../event-page.jsx';

describe('Event Page', () => {

  var gameData = { game: {
    currentEvent: {
      name: 'name',
      description: 'description',
      optionALabel: 'optionALabel',
      optionBLabel: 'optionBLabel'
    }
  }
  };
  // if (gameData === undefined) {
  //  gameData = 1;
  // }

  const wrapper = shallow(<EventPage state={gameData} />);

  it( 'has a name', () => {
    expect(wrapper.contains('name')).to.equal(true);
  });
  it( 'has description', () => {
    expect(wrapper.contains('description')).to.equal(true);
  });
  it( 'has optionALabel', () => {
    expect(wrapper.contains('optionALabel')).to.equal(true);
  });
  it( 'has optionBLabel', () => {
    expect(wrapper.contains('optionBLabel')).to.equal(true);
  });
});
