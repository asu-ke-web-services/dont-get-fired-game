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
    this.companyName = 'Sample Company';
    this.goals = new CSGoal('Get Rich','Have 1000$ To win.',1000, 0);
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
    this.totalQuarters = 10;
    this.currentQuarter = 0;
    this.capital = 100;
    this.capitalPerQuarter = 25;
    this.actions = 0;
    this.actionsPerQuarter = 10;
    this.satisfactionPerQuarter = [];
  }

  BuyProgram(program) {
    program.isPurchased = true;
    this.capital -= program.onBuyCaptial;
    this.actions -= program.onBuyActionPoints;
  }
}
