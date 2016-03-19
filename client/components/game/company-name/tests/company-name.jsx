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
    let wrapper = render(<CompanyName companyName={companyName[0].name} />);
    expect(wrapper.text()).to.contain('Best Company');

    wrapper = render(<CompanyName companyName={companyName[1].name} />);
    expect(wrapper.text()).to.contain('Worst Company');
  });
});
