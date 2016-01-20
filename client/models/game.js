import { default as CompanyBuilder } from '../builders/company-builder';
import { default as IndustryBuilder } from '../builders/industry-builder';
import { default as GoalBuilder } from '../builders/goal-builder';
import {
  default as RandomCompanyBuildingStrategy
} from '../strategies/random-company-building-strategy';

export default class Game {
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
