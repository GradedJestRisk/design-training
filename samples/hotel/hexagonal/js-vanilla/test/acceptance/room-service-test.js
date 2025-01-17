import { expect } from 'chai';
import { knex } from '../../database/database-client.js';
import * as roomService from '../../source/room-service.js';
import * as roomRepository from '../../source/room-repository.js';

describe('Acceptance | room-service', function () {
  describe('get', function () {
    context('if one record', function () {
      it('should return it', async function () {
        // given
        await knex('rooms').delete();
        await knex('rooms').insert({ floor: 0, number: 1, price: 50 });

        // when
        const actual = await roomService.get(roomRepository);

        // then
        const expected = [{ floor: 0, number: 1, price: 50 }];
        expect(actual).to.deep.equal(expected);
      });
    });
  });
});
