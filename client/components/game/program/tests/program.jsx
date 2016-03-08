import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { Differ } from 'react-cortex';

import { default as Program } from '../program.jsx';

describe('A Program Component', () => {
  const componentName = 'program';
  const program = {
    name: 'Save the whales'
  };

  it( 'has not visually changed', (done) => {
    var differ = new Differ({
      component: <Program program={program} />,
      componentName: 'program',
      savePath: __dirname + '/',
      threshold: 0,
      onScreenshotsUpdated: done
    });

    differ.compare().then((areTheSame) => {
      expect(areTheSame).to.equal(true);

      differ.cleanup();

      done();
    });
  });

  it( 'has a name', () => {
    const wrapper = shallow(<Program program={program} />);
    expect(wrapper.contains('Save the whales')).to.equal(true);
  });
});
