import { expect } from 'chai';
import { knex } from '../../database/database-client.js';
import { get } from '../../source/room-repository.js';

describe('Integration | room-repository', function () {
  describe('get', function () {
    context('if no record', function () {
      it('should return an empty list', async function () {
        // given
        await knex('rooms').delete();

        // when
        const actual = await get();

        // then
        const expected = [];
        expect(actual).to.deep.equal(expected);
      });
    });
    context('if one record', function () {
      it('should return it', async function () {
        // given
        await knex('rooms').delete();
        await knex('rooms').insert({ floor: 0, number: 1, price: 50 });

        // when
        const actual = await get();

        // then
        const expected = [{ floor: 0, number: 1, price: 50 }];
        expect(actual).to.deep.equal(expected);
      });
    });
  });
});
