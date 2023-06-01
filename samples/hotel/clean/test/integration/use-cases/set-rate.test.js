import { expect } from 'chai';
import { setRate } from '../../../source/use-cases/set-rate.js';
import { RoomJsonPresenter } from '../../../source/interface-adapters/presenters/room-json-presenter.js';
import * as databaseRoomGateway from '../../../source/interface-adapters/gateways/database-room-gateway.js';
import { knex } from '../../../database/database-client.js';

describe('Integration | Use-cases | set-rate', function () {
  context('when the hotel has one room on the ground floor', function () {
    context('when the baseRate is below the ceiling rate', function () {
      describe('when the gateway is a database', function () {
        it('should update rate in the database', async function () {
          // given
          await knex('rooms').delete();
          await knex('rooms').insert({ number: 1, floor: 0, rate: 100 });
          const roomPresenter = new RoomJsonPresenter();
          const roomGateway = databaseRoomGateway;

          // when
          await setRate({ roomGateway, roomPresenter, baseRate: 100 });

          // then
          const rooms = await knex('rooms').select();
          expect(rooms).deep.equal([{ number: 1, floor: 0, rate: 100 }]);
        });
      });
      describe('when the presenter is JSON', function () {
        it('should return a JSON room', async function () {
          // given
          await knex('rooms').delete();
          await knex('rooms').insert({ number: 1, floor: 0, rate: 100 });
          const roomPresenter = new RoomJsonPresenter();
          const roomGateway = databaseRoomGateway;

          // when
          await setRate({ roomGateway, roomPresenter, baseRate: 100 });

          // then
          const actual = roomPresenter.get();
          expect(actual).deep.equal('{"rooms":[{"number":1,"floor":0,"rate":100}]}');
        });
      });
    });
  });
});
