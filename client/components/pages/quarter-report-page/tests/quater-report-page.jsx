import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { QuaterReportPage } from '.../quater-report-page.jsx';

describe('The quater report Page', () => {
  const quaterNumber = 1;
  const quaterResult = 'one';
  const quaterState = 'two';
  const nextQuaterState = 'three';
  it( 'has quater number', () => {
    const wrapper = shallow(<QuaterReportPage quaterNumber={quaterNumber} />);
    expect(wrapper.contains(1)).to.equal(true);
  });
  it( 'has quater result', () => {
    const wrapper = shallow(<QuaterReportPage quaterResult={quaterResult} />);
    expect(wrapper.contains('one')).to.equal(true);
  });
  it( 'has quater state', () => {
    const wrapper = shallow(<QuaterReportPage quaterState={quaterState} />);
    expect(wrapper.contains('two')).to.equal(true);
  });
  it( 'has next quater state', () => {
    const wrapper = shallow(<QuaterReportPage nextQuaterState={nextQuaterState} />);
    expect(wrapper.contains('three')).to.equal(true);
  });
});
