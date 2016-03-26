export default [
  {
    name: 'Sell a branch company',
    description: 'Sell a non-profit branch company. may make profit in the future',
    optionALabel: 'accept',
    optionAActionPoints: 2,
    optionACaptial: 20,
    optionASatisfaction: 6,
    optionBLabel: 'deny',
    optionBActionPoints: 2,
    optionBCaptial: 2,
    optionBSatisfaction: 6
  },
  {
    name: 'buy stocks from bob or sam',
    description: 'buy from bob this will give 10 captial',
    optionALabel: 'sell a branch',
    optionAActionPoints: 0,
    optionACaptial: 40,
    optionASatisfaction: 0,
    optionBLabel: 'buy from sam. this will add 10 satisfaction points',
    optionBActionPoints: 0,
    optionBCaptial: 0,
    optionBSatisfaction: 10
  }
];

