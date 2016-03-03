import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
const { describe, it } = global;

import { default as mainActionPoints } from '../main-action-points.jsx';

describe('A Main Action Points component', () => {
    const mainactionpoints = {
        header: 'Action Points = ',
        actionPoints: 30
    };

    it ('has a a header', () => {
        const wrapper = shallow(<MainActionPoints mainactionpoints = {mainactionpoints}/>);
        expect(wrapper.contains('Action points = ')).to.equal(true);
    })

    it ('has an action points value', () => {
        const wrapper = shallow(<MainActionPoints mainactionpoints = {mainactionpoints}/>);
        expect(wrapper.contains(30)).to.equal(true);
    })
})