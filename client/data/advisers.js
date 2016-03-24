export default [
  {
    name: 'Quincy Satsoshi',
    description: 'Customer Satisfaction Adviser',
    advice(game) {
      let satisfaction = (game.totalSatisfaction / (game.currentQuarter * 5));
      let sentiment;

      if (satisfaction > 0.6) {
        sentiment = {
          statement: 'Customers are saying they love your company!',
          feeling: 'GOOD',
        };
      } else if (satisfaction > 0.3) {
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
    description: 'Company Satisfaction Adviser',
    advice(game) {
      let satisfaction = game.actionsPerQuarter / 10;
      let sentiment;

      if (satisfaction > 0.6) {
        sentiment = {
          statement: 'Your employees are saying they love working at your company!',
          feeling: 'GOOD',
        };
      } else if (satisfaction > 0.3) {
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
    description: 'Factory Adviser',
    advice(game) {
      let satisfaction = (game.capitalPerQuarter / 5);
      let sentiment;

      if (satisfaction > 0.6) {
        sentiment = {
          statement: 'Everything seems to be in order!',
          feeling: 'GOOD',
        };
      } else if (satisfaction > 0.3) {
        sentiment = {
          statement: 'The company\'s factories could use some improvement.',
          feeling: 'OKAY',
        };
      } else {
        sentiment = {
          statement: 'Our factories might as well be closed down with how ineffecient they are!',
          feeling: 'BAD',
        };
      }

      return sentiment;
    }
  }
];
