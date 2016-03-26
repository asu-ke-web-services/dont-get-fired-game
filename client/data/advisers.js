export default [
  {
    name: 'Quincy Satsoshi',
    description: 'Customer Satisfaction Adviser',
    advice(game) {

      let satisfaction = (game.totalSatisfaction / (game.goals.satisfaction * (game.currentQuarter / game.totalQuarters)));
      let sentiment;

      if (satisfaction > 1) {
        sentiment = {
          statement: 'Customers are saying they love your company!',
          feeling: 'GOOD',
        };
      } else if (satisfaction > .5) {
        sentiment = {
          statement: 'Customer sentiment is currently like warm.',
          feeling: 'OKAY',
        };
      } else {
        sentiment = {
          statement: 'Customers are running away from your products as fast as possible!',
          feeling: 'BAD',
        };
      }

      return sentiment;
    }
  },
  {
    name: 'Colleen Sanders',
    description: 'Company Actions Satisfaction Adviser',
    advice(game) {
      let satisfaction = ( game.actionsPerQuarter / 10);
      let sentiment;

      if (satisfaction > 1) {
        sentiment = {
          statement: 'Your employees are saying they love working at your company!',
          feeling: 'GOOD',
        };
      } else if (satisfaction > 0.5) {
        sentiment = {
          statement: 'Rumor has it that employees are okay with your managerial style.',
          feeling: 'OKAY',
        };
      } else {
        sentiment = {
          statement: 'Employees are actively seeking other jobs and quiting!',
          feeling: 'BAD',
        };
      }

      return sentiment;
    }
  },
  {
    name: 'Phillis Felix',
    description: 'Company Bank Satisfaction Adviser',
    advice(game) {

      let satisfaction = (game.totalCapital / (game.goals.captial * (game.currentQuarter / game.totalQuarters)));
      let sentiment;

      if (satisfaction > 1) {
        sentiment = {
          statement: 'Everything seems to be in order!',
          feeling: 'GOOD',
        };
      } else if (satisfaction > 0.5) {
        sentiment = {
          statement: 'We could use more capital.',
          feeling: 'OKAY',
        };
      } else {
        sentiment = {
          statement: 'We have barely any capital!',
          feeling: 'BAD',
        };
      }

      return sentiment;
    }
  }
];
