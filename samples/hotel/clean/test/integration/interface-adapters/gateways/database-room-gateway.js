import { expect } from 'chai';
import { knex } from '../../../../database/database-client.js';
import { save, get } from '../../../../source/interface-adapters/gateways/database-room-gateway.js';

describe('Integration | Gateway | room-gateway', function () {
  describe('#save', function () {
    context('if the record does not exist', function () {
      it('should create it', async function () {
        // given
        await knex('rooms').delete();
        const roomDTO = [{ floor: 0, number: 1, rate: 50 }];

        // when
        await save(roomDTO);

        // then
        const actual = await knex.from('rooms').select();
        const expected = [{ floor: 0, number: 1, rate: 50 }];
        expect(actual).to.deep.equal(expected);
      });
    });
    context('if the record already exist', function () {
      it('should replace it', async function () {
        // given
        await knex('rooms').delete();
        await knex.from('rooms').insert({ floor: 0, number: 1, rate: 50 });
        const roomDTO = [{ floor: 0, number: 1, rate: 100 }];

        // when
        await save(roomDTO);

        // then
        const actual = await knex.from('rooms').select();
        const expected = [{ floor: 0, number: 1, rate: 100 }];
        expect(actual).to.deep.equal(expected);
      });
    });
  });
  describe('#get', function () {
    context('if a record exist', function () {
      it('should return it', async function () {
        // given
        await knex('rooms').delete();
        await knex.from('rooms').insert({ floor: 0, number: 1, rate: 50 });

        // when
        const actual = await get();

        // then
        expect(actual).to.deep.equal([{ floor: 0, number: 1, rate: 50 }]);
      });
    });
  });
});
