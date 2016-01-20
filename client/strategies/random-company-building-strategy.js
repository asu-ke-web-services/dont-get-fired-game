import Strategy from './definition/strategy';
import dataGoals from '../data/goals';
import dataIndustries from '../data/industries';
import dataCompanyNames from '../data/companyNames';
import PointDistributionStrategy from './point-distribution-strategy';
import RandomUtil from '../utils/random';
import TemplatingUtils from '../utils/templating';

export default class RandomCompanyBuildingStrategy extends Strategy {
  constructor( companyBuilder, industryBuilder, goalBuilder ) {
    super();

    this.companyBuilder = companyBuilder;
    this.industryBuilder = industryBuilder;
    this.goalBuilder = goalBuilder;

    this.goalData = dataGoals;
    this.industryData = dataIndustries;
    this.companyNamesData = dataCompanyNames;

    this.numberOfPoints = 25.0;
    this.pointDistributionStrategy = new PointDistributionStrategy( 5, this.numberOfPoints );
  }

  pickAnIndustry() {
    let industry = RandomUtil.pick( this.industryData );

    return industry;
  }

  pickAGoal() {
    let goal = RandomUtil.pick(this.goalData);

    return goal;
  }

  createCompanyName(industryName) {
    let rawName = RandomUtil.pick(this.companyNamesData);
    let companyName = TemplatingUtils.templatize(rawName, {
      name: industryName
    });

    return companyName;
  }

  execute() {
    // TODO create a system of 25 "points" to distribute amoung these different initial settings
    // Sort of to weight them so that you never have an AMAZING start state
    let industryOptions = this.pickAnIndustry();
    let goalOptions = this.pickAGoal();
    let companyName = this.createCompanyName(industryOptions.name);

    let points = this.pointDistributionStrategy.execute();

    /* should be between (0.001 and 0.0001] */
    let marketPenetration = Math.floor( points[0] * 10 / this.numberOfPoints ) / 10000;
    /* Between [1 to 3) */
    let numberOfFactories = Math.floor( points[1] * 3 / this.numberOfPoints + 1 );
    /* Between 0.1 to 0.4 */
    let averageFactoryEfficiency = Math.floor( points[2] * 4 / this.numberOfPoints + 1 ) / 10;
    /* Between .3 and .7 */
    let companySatisfaction = Math.floor( points[3] * 3 / this.numberOfPoints + 4 ) / 10;
    /* Between .3 and .7 */
    let customerSatisfaction = Math.floor( points[4] * 3 / this.numberOfPoints + 4 ) / 10;

    // Build the goal
    this.goalBuilder.setFromOptions(goalOptions);

    let goal = this.goalBuilder.build();

    // Build the industry
    this.industryBuilder.setFromOptions(industryOptions);

    let industry = this.industryBuilder.build();

    // Build the company
    this.companyBuilder.setGoal(goal);
    this.companyBuilder.setIndustry(industry);
    this.companyBuilder.setName(companyName);
    this.companyBuilder.setMarketPenetration(marketPenetration);
    this.companyBuilder.setNumberOfFactories(numberOfFactories);
    this.companyBuilder.setAverageFactoryEfficiency(averageFactoryEfficiency);
    this.companyBuilder.setCompanySatisfaction(companySatisfaction);
    this.companyBuilder.setCustomerSatisfaction(customerSatisfaction);

    return this.companyBuilder.build();
  }
}
