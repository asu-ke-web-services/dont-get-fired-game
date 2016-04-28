import React from 'react';
import {expect} from 'chai';
const {describe, it} = global;
import {shallow} from 'enzyme';
import { default as AdvisorPanel } from '../advisor-panel.jsx';

describe('Advisor Panel', () => {

  var gameData = { game: {
    advisors: [
      {
        name: 'Ivan',
        advice() {
          var sentiment = {
            statement: 'Customers are saying they love your company!',
            feeling: 'GOOD',
          };
          return sentiment;
        }
      }
    ],
    goals:
      {
        captial: 50,
        satisfaction: 100
      },

    totalSatisfaction: 50,
    totalCapital: 50,
    totalQuarters: 15,
    actionsPerQuarter: 5
  }
  };

  if (gameData.game === undefined) {
    gameData.game = 0;
  }

  it( 'has one advisor', () => {
    const wrapper = shallow(<AdvisorPanel state={gameData} />);
    expect(wrapper.contains('GOOD')).to.equal(true);
  });
});
