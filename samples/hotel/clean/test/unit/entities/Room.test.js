import { expect } from 'chai';
import { Room } from '../../../source/entities/Room.js';

// | Floor | Rate
// | ----- |-----
// |   0   | base
// |   1   | 1,O7 * base
// |   2   | 1,22 * base
// |   3   | 1,33 * base

// Ceiling to 200€

describe('Unit | Room', function () {
  describe('setRate', function () {
    context('when the rate is below ceiling rate', function () {
      context('when the room is on the ground floor', function () {
        it('should set the rate to base rate', function () {
          // given
          const floor = 0;
          const room = new Room({ number: 1, floor, rate: 50 });
          const baseRate = 100;

          // when
          room.setRate({ baseRate });

          // then
          expect(room.rate).to.equal(100);
        });
      });
      context('when the room is on the first floor', function () {
        it('should set the rate to base rate + 7%', function () {
          // given
          const floor = 1;
          const room = new Room({ number: 1, floor, rate: 50 });
          const baseRate = 200;

          // when
          room.setRate({ baseRate });

          // then
          expect(room.rate).to.equal(214);
        });
      });
      context('when the room is on the second floor', function () {
        it('should set the rate to base rate + 22%', function () {
          // given
          const floor = 2;
          const room = new Room({ number: 1, floor, rate: 50 });
          const baseRate = 100;

          // when
          room.setRate({ baseRate });

          // then
          expect(room.rate).to.equal(122);
        });
      });
      context('when the room is on the third floor', function () {
        it('should set the rate to base rate + 33%', function () {
          // given
          const floor = 3;
          const room = new Room({ number: 1, floor, rate: 50 });
          const baseRate = 100;

          // when
          room.setRate({ baseRate });

          // then
          expect(room.rate).to.equal(133);
        });
      });
    });
    context('when the rate is above the ceiling rate', function () {
      it('should set the rate to the ceiling rate', function () {
        // given
        const floor = 0;
        const room = new Room({ number: 1, floor, rate: 50 });
        const baseRate = 201;

        // when
        room.setRate({ baseRate });

        // then
        expect(room.rate).to.equal(200);
      });
    });
  });
});
