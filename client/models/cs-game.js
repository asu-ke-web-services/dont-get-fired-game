import { default as Advisers } from '../data/advisers';
import { default as CSGoal } from '../models/cs-goal';
import { default as CSProgram } from '../models/cs-program';
export default class CSGame {
  constructor() {
    this.companyName = null;
    this.goals = null;
    this.programs = [];
    this.totalQuarters = null;
    this.currentQuarter = null;
    this.advisors = Advisers;
    this.capital = null;
    this.capitalPerQuarter = null;
    this.actions = null;
    this.actionsPerQuarter = null;
    this.satisfactionPerQuarter = [];
    this.SampleGame();

  }
  init() {

  }
  SampleGame() {
    this.companyName = this.getRandomOption([ 'Solar Tech','Freddy and Friend\'s Discount Cars',
      'David\'s Bucket O\' Chicken', 'Dane and Ash Guitars', 'Gary\'s General Store' ]);
    this.goals = this.getRandomOption([
      new CSGoal('Get Rich','Have $1000 to win.',1000, 0),
      new CSGoal('Oh-So Satisfying!','Have 100 Satisfaction to win.',0, 100),
      new CSGoal('Jack Of All Trades','Have $1000 and 100 Satisfaction to win.',1000, 100)
    ]);
    this.programs = [];
    this.programs.push(
      new CSProgram( 'Program Sample', 'A Great Deal',
      10, 10, 10,
      2, 5, 3)
    );
    this.programs.push(
        new CSProgram( 'Program Sample Two', 'A Bad Deal',
            10, 10, 0,
            1, 1, 1)
    );
    this.advisors = Advisers;
    this.totalQuarters = this.getRandomOption([ 8,10,15 ]);
    this.currentQuarter = 0;
    this.capital = this.getRandomOption([ 50,100,200 ]);
    this.capitalPerQuarter = this.getRandomOption([ 15,25,30 ]);
    this.actions = this.getRandomOption([ 1,2,3 ]);
    this.actionsPerQuarter = this.getRandomOption([ 1,2,3 ]);
    this.satisfactionPerQuarter = [];
  }

  BuyProgram(program) {
    program.isPurchased = true;
    this.capital -= program.onBuyCaptial;
    this.actions -= program.onBuyActionPoints;
  }

  // pass in an array and return 1 object from that array randomly
  getRandomOption(list) {
    var randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  }

}
