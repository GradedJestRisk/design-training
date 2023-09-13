import { expect } from 'chai';

describe('Unit | Controller| cli-room-controller', function () {
  describe('when the user enter a number', function () {
    it('should call the use-case providing this number', function () {
      // given
      const setRate = stub();
      setRate.return();

      // when
      controller.execute();

      // then
      expect(setRate).to.have.been.calledOnceWithExactly(11);
    });
  });
});
