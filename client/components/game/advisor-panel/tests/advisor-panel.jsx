// import React from 'react';
// import {expect} from 'chai';
// const {describe, it} = global;
// import {render} from 'enzyme';
// import { default as AdvisorPanel } from '../advisor-panel.jsx';

// describe('Advisor Panel', () => {

//  var gameData = { game: {
//    advisors: [
//      {
//        name: 'Ivan',
//        advice(game) {
//          sentiment = {
//            statement: 'Customers are saying they love your company!',
//           feeling: 'GOOD',
//          };
//          return sentiment;
//        }
//      }
//    ],
//    goals:
//      {
//        captial: 50,
//        satisfaction: 100
//      },

//    totalSatisfaction: 50,
//    totalCapital: 50,
//    totalQuarters: 15,
//    actionsPerQuarter: 5
//  }
//  };

//  it( 'has one advisor', () => {
//    const wrapper = render(<AdvisorPanel game={gameData} />);
//    expect(wrapper.contains('Ivan')).to.equal(true);
//  });
// });
