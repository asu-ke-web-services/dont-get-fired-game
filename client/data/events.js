export default [
  {
    name: 'Factory Protest!',
    description: `There is a protest at one of your factories calling for higher wages.
    <br/>
    You can close down the factory, which will affect company morale negatively,
    or you can increase wages, costing the company money, but increasing morale.`,
    optionALabel: 'Close down factory',
    optionA(game) {
      game.company.removeFactory();

      return {
        averageFactoryEfficiency: -0.05,
        companySatisfaction: -0.2,
        customerSatisfaction: -0.1
      };
    },
    optionBLabel: 'Increase wages',
    optionB(game) {
      game.industry.quarterCostPerFactory *= 1.1;

      return {
        averageFactoryEfficiency: 0.05,
        companySatisfaction: 0.1,
        customerSatisfaction: 0.05
      };
    }
  },
  {
    name: 'Money Laundering!',
    description: `There are reports that some of your management team is
    laundering money.
    <br/>
    You can fire the management team responsible, or
    you can ignore the problem and claim ignorance.`,
    optionALabel: 'Ignore the problem',
    optionA() {
      return {
        companySatisfaction: -0.3,
        customerSatisfaction: -0.2
      };
    },
    optionBLabel: 'Fire management',
    optionB() {
      return {
        averageFactoryEfficiency: -0.1,
        companySatisfaction: 0.1,
        customerSatisfaction: 0.3
      };
    }
  }
];
