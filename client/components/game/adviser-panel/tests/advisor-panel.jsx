import React from 'react';
import {expect} from 'chai';
const {describe, it} = global;
import {shallow} from 'enzyme';
import { default as AdviserPanel } from '../adviser-panel.jsx';

describe('Adviser Panel', () => {

  var gameData = { game: {
    advisers: [
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

  it( 'has one adviser', () => {
    const wrapper = shallow(<AdviserPanel state={gameData} />);
    expect(wrapper.contains('GOOD')).to.equal(true);
  });
});
