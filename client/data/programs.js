export default [
  {
    name: 'Quality Control',
    description: `Add quality control checking to your business via Six Sigma.`,
    programImage: '',
    initialCost(game) {
      return game.company.numberOfFactories * 10000;
    },
    quarterCost(game) {
      return game.company.numberOfFactories * 1000;
    },
    initialEffects() {
      return {
        companySatisfaction: 0.1,
        customerSatisfaction: 0.10,
        averageFactoryEfficiency: -0.1
      };
    },
  },
  {
    name: 'Recycling',
    description: '',
    programImage: '',
    initialCost(game) {
      return game.company.numberOfFactories * 5000;
    },
    quarterCost(game) {
      return game.company.numberOfFactories * 3000;
    },
    initialEffects() {
      return {
        companySatisfaction: 0.1,
        customerSatisfaction: 0.2
      };
    },
    quarterEffects() {
      return {
        customerSatisfaction: 0.1
      };
    }
  },
  {
    name: 'Use Clean Energy',
    description: 'Get the energy to power your factories from clean energy sources only',
    programImage: '',
    initialCost(game) {
      return game.company.numberOfFactories * 50000;
    },
    quarterCost(game) {
      return game.company.numberOfFactories * 10000;
    },
    initialEffects() {
      return {
        companySatisfaction: -0.2,
        customerSatisfaction: 0.5,
        averageFactoryEfficiency: -0.1
      };
    },
    quarterEffects() {
      return {
        customerSatisfaction: 0.2
      };
    }
  },
  {
    name: 'Catered Lunches',
    description: '',
    programImage: '',
    initialCost(game) {
      return game.company.numberOfFactories * 10000;
    },
    quarterCost(game) {
      return game.company.numberOfFactories * 10000;
    },
    initialEffects() {
      return {
        companySatisfaction: 0.3,
        averageFactoryEfficiency: 0.05
      };
    },
    quarterEffects() {
      return {
        companySatisfaction: 0.1
      };
    }
  },
  {
    name: 'Add A Factory',
    description: '',
    programImage: '',
    allowMultiple: true,
    initialCost(game) {
      return game.industry.initialCostPerFactory;
    },
    quarterCost(game) {
      return game.industry.quarterCostPerFactory;
    },
    initialEffects() {
      return {
        companySatisfaction: 0.1,
        averageFactoryEfficiency: -0.05
      };
    }
  },
];
