import { default as CompanyBuilder } from '/client/builders/CompanyBuilder';
import { default as IndustryBuilder } from '/client/builders/IndustryBuilder';
import { default as GoalBuilder } from '/client/builders/GoalBuilder';
import { default as RandomCompanyBuildingStrategy } from '/client/strategies/RandomCompanyBuildingStrategy';

export default Game = class Game {
  constructor() {
    this.company = null;
    this.companyBuilder = CompanyBuilder;
    this.industryBuilder = IndustryBuilder;
    this.goalBuilder = GoalBuilder;
    this.companyBuildingStrategy = RandomCompanyBuildingStrategy;
  }

  init() {
    let company = this.createCompany();

    this.company = company;
  }

  createCompany() {
    let strategy = new this.companyBuildingStrategy(
        new this.companyBuilder(),
        new this.industryBuilder(),
        new this.goalBuilder()
    );
    return strategy.execute();
  }
}