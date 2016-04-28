import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const {describe, it} = global;

import { FinalReportPage } from '../final-report-page.jsx';

describe('The final quater report Page', () => {

  var gameWin = { game: {
    goalsMeet: true,
    companyName: 'companyName',
    capital: 105,
    totalSatisfaction: 121,
    goals: {
      satisfaction: 100,
      capital: 100
    }
  }
  };
  var gameLose = { game: {
    goalsMeet: false,
    companyName: 'companyName',
    capital: 50,
    totalSatisfaction: 73,
    goals: {
      satisfaction: 100,
      capital: 100
    }
  }
  };

  it( 'has Win State', () => {
    const wrapper = shallow(<FinalReportPage state={gameWin} />);
    // console.log(wrapper.text());
    expect(wrapper.contains('Congrats!')).to.equal(true);
  });
  it( 'has Lose State', () => {
    const wrapper = shallow(<FinalReportPage state={gameLose} />);
    expect(wrapper.contains('Sorry, you lost the game!')).to.equal(true);
  });

});
