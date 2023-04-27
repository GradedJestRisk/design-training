import { expect } from 'chai';
import { get } from '../../source/room-service.js';

// | Étage | numéro  | Prix
// |:-----:|:-------:|-------
// |   0   | 1       | 50€
// |   0   | 2       | 50€
// |   1   | 101     | 53,5€
// |   1   | 102     | 53,5€
// |   1   | 103     | 53,5€
// |   2   | 201     | 61€
// |   2   | 202     | 61€
// |   3   | 301     | 66,5€

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
});
