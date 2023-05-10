import { expect } from 'chai';
// eslint-disable-next-line node/no-unpublished-import
import * as sinon from 'sinon';
import { get, setRates } from '../../source/room-service.js';

// | Floor | Rate
// | ----- |-----
// |   0   | base
// |   1   | 1,O7 * base
// |   2   | 1,22 * base
// |   3   | 1,33 * base

// Ceiling to 200€

describe('Unit | room-service', function () {
  describe('get', function () {
    context('if hotel has no rooms', function () {
      it('should return an empty list', function () {
        // given
        const roomRepository = {
          get: () => {
            return [];
          },
        };

        // when
        const actual = get(roomRepository);

        // then
        const expected = [];
        expect(actual).to.deep.equal(expected);
      });
    });
    context('if hotel has one room', function () {
      it('should return it', function () {
        // given
        const roomRepository = {
          get: () => {
            return [{ floor: 0, number: 1, price: 50 }];
          },
        };
        // when
        const actual = get(roomRepository);

        // then
        const expected = [{ floor: 0, number: 1, price: 50 }];
        expect(actual).to.deep.equal(expected);
      });
    });
    context('if hotel has more than one room', function () {
      it('should return all of them ', function () {
        // given
        const roomRepository = {
          get: () => {
            return [
              { floor: 0, number: 1, price: 50 },
              { floor: 0, number: 2, price: 50 },
              { floor: 1, number: 101, price: 53.5 },
              { floor: 1, number: 102, price: 53.5 },
              { floor: 1, number: 103, price: 53.5 },
              { floor: 2, number: 201, price: 61 },
              { floor: 2, number: 202, price: 61 },
              { floor: 3, number: 301, price: 66.5 },
            ];
          },
        };
        // when
        const actual = get(roomRepository);

        // then
        const expected = [
          { floor: 0, number: 1, price: 50 },
          { floor: 0, number: 2, price: 50 },
          { floor: 1, number: 101, price: 53.5 },
          { floor: 1, number: 102, price: 53.5 },
          { floor: 1, number: 103, price: 53.5 },
          { floor: 2, number: 201, price: 61 },
          { floor: 2, number: 202, price: 61 },
          { floor: 3, number: 301, price: 66.5 },
        ];
        expect(actual).to.deep.equal(expected);
      });
    });
  });
  describe('setRates', function () {
    context('when the ground floor rate is below ceiling rate', function () {
      context('when the hotel has a room on the ground floor', function () {
        it('should set the rate to ground floor rate', function () {
          // given
          const roomRepository = {
            get: () => {
              return [{ floor: 0, number: 1, price: 50 }];
            },
            set: sinon.stub().resolves(),
          };
          const groundFloorRate = 100;

          // when
          setRates({ baseRate: groundFloorRate, roomRepository });

          // then
          const roomsWithUpdatedRate = roomRepository.set.firstCall.args[0];
          const actual = roomsWithUpdatedRate.find(({ number }) => number === 1).price;
          const expected = 100;
          expect(actual).to.equal(expected);
        });
      });
      context('when the hotel has several rooms on the ground floor', function () {
        it('should set all ground floor rooms rate to ground floor rate', function () {
          // given
          const roomRepository = {
            get: () => {
              return [
                { floor: 0, number: 1, price: 50 },
                { floor: 0, number: 2, price: 50 },
              ];
            },
            set: sinon.stub().resolves(),
          };
          const groundFloorRate = 100;

          // when
          setRates({ baseRate: groundFloorRate, roomRepository });

          // then
          const roomsWithUpdatedRate = roomRepository.set.firstCall.args[0];
          const actual = roomsWithUpdatedRate
            .filter(({ floor }) => floor === 0)
            .filter(({ price }) => price === 100)
            .map(({ number }) => number);
          const expected = [1, 2];
          expect(actual).to.include.members(expected);
        });
      });
    });
    context('when the ground floor rate is above the ceiling rate', function () {
      context('when the hotel has a room on the ground floor', function () {
        it('should set the rate to the ceiling rate', function () {
          // given
          const roomRepository = {
            get: () => {
              return [{ floor: 0, number: 1, price: 50 }];
            },
            set: sinon.stub().resolves(),
          };
          const groundFloorRate = 201;

          // when
          setRates({ baseRate: groundFloorRate, roomRepository });

          // then
          const roomsWithUpdatedRate = roomRepository.set.firstCall.args[0];
          const actual = roomsWithUpdatedRate.find(({ number }) => number === 1).price;
          const expected = 200;
          expect(actual).to.equal(expected);
        });
      });
    });
  });
  context('when the hotel has a room on the first floor', function () {
    it('should set the rate to ground floor rate * 1.07', function () {
      // given
      const roomRepository = {
        get: () => {
          return [{ floor: 1, number: 101, price: 50 }];
        },
        set: sinon.stub().resolves(),
      };
      const groundFloorRate = 100;

      // when
      setRates({ baseRate: groundFloorRate, roomRepository });

      // then
      const roomsWithUpdatedRate = roomRepository.set.firstCall.args[0];
      const actual = roomsWithUpdatedRate.find(({ number }) => number === 101).price;
      const expected = 107;
      expect(actual).to.equal(expected);
    });
  });
  context('when the hotel has a room on the second floor', function () {
    it('should set the rate to ground floor rate * 1.22', function () {
      // given
      const roomRepository = {
        get: () => {
          return [{ floor: 2, number: 201, price: 50 }];
        },
        set: sinon.stub().resolves(),
      };
      const groundFloorRate = 100;

      // when
      setRates({ baseRate: groundFloorRate, roomRepository });

      // then
      const roomsWithUpdatedRate = roomRepository.set.firstCall.args[0];
      const actual = roomsWithUpdatedRate.find(({ number }) => number === 201).price;
      const expected = 122;
      expect(actual).to.equal(expected);
    });
  });
  context('when the hotel has a room on the third floor', function () {
    it('should set the rate to ground floor rate * 1.33', function () {
      // given
      const roomRepository = {
        get: () => {
          return [{ floor: 3, number: 302, price: 50 }];
        },
        set: sinon.stub().resolves(),
      };
      const groundFloorRate = 100;

      // when
      setRates({ baseRate: groundFloorRate, roomRepository });

      // then
      const roomsWithUpdatedRate = roomRepository.set.firstCall.args[0];
      const actual = roomsWithUpdatedRate.find(({ number }) => number === 302).price;
      const expected = 133;
      expect(actual).to.equal(expected);
    });
  });
});
