import React from 'react';
import {expect} from 'chai';
import {render} from 'enzyme';
const {describe, it} = global;

import { default as CompanyName } from '../company-name.jsx';

describe('Company has a name', () => {
  const companyName = [ {
    name: 'Best Company'
  }, {
    name: 'Worst Company'
  } ];

  it( 'has name', () => {
    const wrapper = render(<CompanyName companyName={companyName} />);
    expect(wrapper.text()).to.contain('Best Company');
    expect(wrapper.text()).to.contain('Worst Company');
  });
});
