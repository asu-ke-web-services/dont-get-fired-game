import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
const { describe, it } = global;

import { default as NewGame } from '../new-game.jsx';

describe{'A New Game component', () => {
    const newgame = {
        title: 'CCR Incorporated',
        body: "Don't get fired!"
    };

    it ('has a title', () => {
        const wrapper = shallow(<NewGame newgame = {newgame}/>);
        expect(wrapper.contains('CCR Incorporated')).to.equal(true);
    });

    it ('has a body', () => {
        const wrapper = shallow(<NewGame newgame = {newgame}/>);
        expect(wrapper.contains("Don't get fired!")).to.equal(true);
    })
}};