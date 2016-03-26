import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { QuarterReportPage } from '.../quarter-report-page.jsx';

describe('The quarter report Page', () => {
  const quarterNumber = 1;
  const quarterResult = 'one';
  const quarterState = 'two';
  const nextQuarterState = 'three';
  it( 'has quarter number', () => {
    const wrapper = shallow(<QuarterReportPage quarterNumber={quarterNumber} />);
    expect(wrapper.contains(1)).to.equal(true);
  });
  it( 'has quarter result', () => {
    const wrapper = shallow(<QuarterReportPage quarterResult={quarterResult} />);
    expect(wrapper.contains('one')).to.equal(true);
  });
  it( 'has quarter state', () => {
    const wrapper = shallow(<QuarterReportPage quarterState={quarterState} />);
    expect(wrapper.contains('two')).to.equal(true);
  });
  it( 'has next quarter state', () => {
    const wrapper = shallow(<QuarterReportPage nextQuarterState={nextQuarterState} />);
    expect(wrapper.contains('three')).to.equal(true);
  });
});
