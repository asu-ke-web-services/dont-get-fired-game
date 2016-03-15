import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { FinalReportPage } from '../final-report-page.jsx';

describe('The final quater report Page', () => {
  const name = 'one';
  const accomplishments = 'two';
  const goal = 'three';
  it( 'has name', () => {
    const wrapper = shallow(<FinalReportPage name={name} />);
    expect(wrapper.contains('one')).to.equal(true);
  });
  it( 'has accomplishments', () => {
    const wrapper = shallow(<FinalReportPage accomplishments={accomplishments} />);
    expect(wrapper.contains('two')).to.equal(true);
  });
  it( 'has goal', () => {
    const wrapper = shallow(<FinalReportPage goal={goal} />);
    expect(wrapper.contains('three')).to.equal(true);
  });
});

