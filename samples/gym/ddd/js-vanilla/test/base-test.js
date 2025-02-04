import { expect } from 'chai';

describe('Unit', function () {
  describe('foo', function () {
    context('bar', function () {
      it('should succeed', function () {
        expect(true).to.equal(true);
      });
    });
  });
});
