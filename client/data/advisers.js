export default [
  {
    name: 'Quincy Satsoshi',
    description: 'Customer Satisfaction Adviser',
    advice(game) {
      let satisfaction = game.company.customerSatisfaction;

      if (satisfaction > 0.6) {
        return {
          statement: 'Customers are saying they love your company!',
          feeling: 'GOOD',
        };
      } else if (satisfaction > 0.3) {
        return {
          statement: 'Customer sentiment is currently like warm.',
          feeling: 'OKAY',
        };
      } else {
        return {
          statement: 'Customers are running away from your products as fast as possible!',
          feeling: 'BAD',
        };
      }
    }
  },
  {
    name: 'Colleen Sanders',
    description: 'Company Satisfaction Adviser',
    advice(game) {
      let satisfaction = game.company.companySatisfaction;

      if (satisfaction > 0.6) {
        return {
          statement: 'Your employees are saying they love working at your company!',
          feeling: 'GOOD',
        };
      } else if (satisfaction > 0.3) {
        return {
          statement: 'Rumor has it that employees are okay with your managerial style.',
          feeling: 'OKAY',
        };
      } else {
        return {
          statement: 'Employees are actively seeking other jobs and quiting!',
          feeling: 'BAD',
        };
      }
    }
  },
  {
    name: 'Phillis Felix',
    description: 'Factory Adviser',
    advice(game) {
      let efficiency = game.company.averageFactoryEfficiency;

      if (efficiency > 0.6) {
        return {
          statement: 'Everything seems to be in order!',
          feeling: 'GOOD',
        };
      } else if (efficiency > 0.3) {
        return {
          statement: 'The company\'s factories could use some improvement.',
          feeling: 'OKAY',
        };
      } else {
        return {
          statement: 'Our factories might as well be closed down with how ineffecient they are!',
          feeling: 'BAD',
        };
      }
    }
  },
];