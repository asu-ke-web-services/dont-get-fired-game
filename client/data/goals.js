export default [
  {
    name: 'Reach $10,000,000 in funds',
    description: 'Accumulate a total of $10,000,000 in your available funds',
    hooks: [ {
      subscribe: 'funds-change',
      callback( newFundAmount ) {
        let success = false;
        if ( newFundAmount > 10000000 ) {
          success = true;
        }

        return success;
      }
    } ]
  }
];
