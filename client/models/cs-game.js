import { default as Advisers } from '../data/advisers';
import { default as CSGoal } from '../models/cs-goal';
import { default as CSPrograms } from '../data/cs-programs';
import { default as CSEvents } from '../data/cs-events';
export default class CSGame {
  constructor() {
    this.companyName = null;
    this.goals = null;
    this.programs = CSPrograms;
    this.events = CSEvents;
    this.currentEvent = null;
    this.totalQuarters = null;
    this.currentQuarter = 0;
    this.advisors = Advisers;
    this.capital = null;
    this.capitalPerQuarter = null;
    this.actions = null;
    this.actionsPerQuarter = null;
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
    this.totalQuarters = this.getRandomOption([ 8,10,15 ]);
    this.capital = this.getRandomOption([ 50,100,200 ]);
    this.capitalPerQuarter = this.getRandomOption([ 15,25,30 ]);
    this.actions = this.getRandomOption([ 1,2,3 ]);
    this.actionsPerQuarter = this.getRandomOption([ 1,2,3 ]);
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

  // pass in an array and return 1 object from that array randomly
  getRandomOption(list) {
    var randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  }

  getRandomEvent() {
    this.currentEvent = this.events[Math.floor(Math.random() * this.events.length)];
  }

  processEvent(choose) {
    if (choose === 'A') {
      this.capital += this.currentEvent.optionACaptial;
      this.actions += this.currentEvent.optionAActionPoints;
      this.satisfactionCurrentQuarter += this.currentEvent.optionASatisfaction;
      this.capitalChangeInCurrentQuarter += this.currentEvent.optionACapital;
    } else if (choose === 'B') {
      this.capital += this.currentEvent.optionBCapital;
      this.actions += this.currentEvent.optionBActionPoints;
      this.satisfactionCurrentQuarter += this.currentEvent.optionBSatisfaction;
      this.capitalChangeInCurrentQuarter += this.currentEvent.optionBCapital;
    }
  }

}
