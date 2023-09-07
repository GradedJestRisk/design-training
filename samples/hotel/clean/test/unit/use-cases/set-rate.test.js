import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
// eslint-disable-next-line node/no-unpublished-import
import { stub } from 'sinon';

import { setRate } from '../../../source/use-cases/set-rate.js';

describe('Unit | Use-cases | set-rate', function () {
  let roomGateway;
  let roomPresenter;
  beforeEach(function () {
    roomGateway = { get: stub(), save: stub() };
    roomPresenter = { execute: stub() };
  });
  context('when the hotel has one room on the ground floor', function () {
    context('when the baseRate is below the ceiling rate', function () {
      it('should call roomPresenter.execute with the room with the base rate', async function () {
        // given
        roomGateway.get.returns([{ number: 1, floor: 0, rate: 50 }]);

        // when
        await setRate({ roomGateway, roomPresenter, baseRate: 100 });

        // then
        expect(roomPresenter.execute).to.have.been.calledOnceWithExactly([{ number: 1, floor: 0, rate: 100 }]);
      });
      it('should call roomGateway.save with room with the base rate', async function () {
        // given
        roomGateway.get.returns([{ number: 1, floor: 0, rate: 50 }]);
        roomGateway.save.returns();

        // when
        await setRate({ roomGateway, roomPresenter, baseRate: 100 });

        // then
        expect(roomGateway.save).to.have.been.calledOnceWithExactly([{ number: 1, floor: 0, rate: 100 }]);
      });
    });
  });
  context('when the hotel has several room on the ground floor', function () {
    context('when the baseRate is below the ceiling rate', function () {
      it('should should call roomPresenter.execute with all rooms with the base rate', async function () {
        // given
        roomGateway.get.returns([
          { number: 1, floor: 0, rate: 50 },
          { number: 2, floor: 0, rate: 50 },
        ]);

        // when
        await setRate({ roomGateway, roomPresenter, baseRate: 100 });

        // then
        const expected = [
          { number: 1, floor: 0, rate: 100 },
          { number: 2, floor: 0, rate: 100 },
        ];
        expect(roomPresenter.execute).to.have.been.calledOnceWithExactly(expected);
      });
      it('should call roomGateway.save with all rooms with the base rate', async function () {
        // given
        roomGateway.get.returns([
          { number: 1, floor: 0, rate: 50 },
          { number: 2, floor: 0, rate: 50 },
        ]);
        roomGateway.save.returns();

        // when
        await setRate({ roomGateway, roomPresenter, baseRate: 100 });

        // then
        const expected = [
          { number: 1, floor: 0, rate: 100 },
          { number: 2, floor: 0, rate: 100 },
        ];
        expect(roomGateway.save).to.have.been.calledOnceWithExactly(expected);
      });
    });
  });
});
