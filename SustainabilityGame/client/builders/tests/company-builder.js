import {describe, it} from 'mocha';
import {expect} from 'chai';

import CompanyBuilder from '../company-builder';

describe('The company builder', function () {
  let builder = null;

  beforeEach(function () {
    builder = new CompanyBuilder();
  });

  it('can make companies', function () {
    const company = builder.build();

    expect(typeof company).toBe('Object');
  });
});
