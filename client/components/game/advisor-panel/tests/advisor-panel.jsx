// import React from 'react';
// import {expect} from 'chai';
// import {shallow} from 'enzyme';
// const {describe, it} = global;
//
// import { default as AdvisorPanel } from '../advisor-panel.jsx';
//
// describe('Advisor Panel', () => {
//
//
//   var gameWithOneAdvisors = {advisors: [
//    {
//      name: 'Ivan',
//      advice(game) {
//        sentiment = {
//          statement: 'Customers are saying they love your company!',
//          feeling: 'GOOD',
//        };
//
//        return sentiment;
//      }
//    }
//  ]};
//
//  var gameWithTwoAdvisors = {advisors: [
//   {
//      name: 'Ivan',
//     advice(game) {
//        sentiment = {
//          statement: 'Customers are saying they love your company!',
//          feeling: 'GOOD',
//        };
//
//        return sentiment;
//      }
//    },
//    {
//      name: 'Ryan',
//      advice(game) {
//        sentiment = {
//          statement: 'Customers are saying they dislike your company!',
//          feeling: 'BAD',
//        };
//
//        return sentiment;
//      }
//    }
//  ]};
//
//  it( 'has one advisor', () => {
//    const wrapper = shallow(<AdvisorPanel game={gameWithOneAdvisors} />);
//    expect(wrapper.contains('Ivan')).to.equal(true);
//    expect(wrapper.contains('Ryan')).to.equal(false);
//  });
//
//  it( 'has two advisors', () => {
//    const wrapper = shallow(<AdvisorPanel game={gameWithTwoAdvisors} />);
//    expect(wrapper.contains('Ivan')).to.equal(true);
//    expect(wrapper.contains('Ryan')).to.equal(true);
//  });
//
//  it( 'has no advisors', () => {
//    const wrapper = shallow(<AdvisorPanel />);
//
//    expect(wrapper.contains('No advisors')).to.equal(true);
//  });
// });
