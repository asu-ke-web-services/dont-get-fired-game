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
    this.sampleGame();

  }
  init() {

  }
  sampleGame() {
    this.companyName = 'Sample Company';
    this.goals = new CSGoal('Get Rich','Have 1000$ To win.',300, 15);
    this.programs = [];
    this.programs.push(
      new CSProgram( 'Program Sample', 'A Great Deal',
      10, 10, 10,
      15, 15, 3)
    );
    this.programs.push(
        new CSProgram( 'Program Sample Two', 'A Bad Deal',
            10, 10, 0,
            1, 1, 1)
    );
    this.advisors = Advisers;
    this.totalQuarters = 10;
    this.currentQuarter = 1;
    this.capital = 5;
    this.capitalPerQuarter = 25;
    this.actions = 25;
    this.actionsPerQuarter = 10;
    this.totalSatisfaction = 0;
    this.goalsMeet = false;
    this.gameOver = false;


    this.satisfactionCurrentQuarter = 0;
    this.capitalChangeInCurrentQuarter = 0;
  }

  buyProgram(program) {
    let boughtProgram = false;
    if ( this.capital >= program.onBuyCaptial && this.actions >= program.onBuyActionPoints ) {
      program.isPurchased = true;
      this.capital -= program.onBuyCaptial;
      this.actions -= program.onBuyActionPoints;
      this.satisfactionCurrentQuarter += program.onBuySatisfaction;
      this.capitalChangeInCurrentQuarter -= program.onBuyCaptial;
      boughtProgram = true;
    } else {
      boughtProgram = false;
    }
    return boughtProgram;
  }

  nextQuarter() {
    // Add Satisfaction Points
    this.totalSatisfaction += this.satisfactionCurrentQuarter;

    // Check Goals
    if ( this.capital >= this.goals.capital && this.totalSatisfaction >= this.goals.satisfaction ) {
      this.goalsMeet = true;
      return;
    }

    // Check Last Turn
    if ( this.currentQuarter === this.totalQuarters ) {
      this.gameOver = true;
      return;
    }

    // Clear Change In Current Quarter
    this.satisfactionCurrentQuarter = 0;
    this.capitalChangeInCurrentQuarter = 0;

    // Base Pre Quarter
    this.capital += this.capitalPerQuarter;
    this.capitalChangeInCurrentQuarter += this.capitalPerQuarter;
    this.actions = this.actionsPerQuarter;

    // Programs
    for ( var i = 0; i < this.programs.length; i++ ) {
      if ( this.programs[i].isPurchased ) {
        this.actions += this.programs[i].onQuarterActionPoints;
        this.capital += this.programs[i].onQuarterCaptial;
        this.capitalChangeInCurrentQuarter += this.programs[i].onQuarterCaptial;
        this.satisfactionCurrentQuarter += this.programs[i].onQuarterSatisfaction;
      }
    }

    this.currentQuarter++;
  }
}
