import { expect } from 'chai';
import { MemoryRoomGateway } from '../../../../source/interface-adapters/gateways/memory-room-gateway.js';

describe('Unit | Gateway | memory-room-gateway', function () {
  describe('#save', function () {
    context('if the record does not exist', function () {
      it('should create it', async function () {
        // given
        const memoryRoomGateway = new MemoryRoomGateway();
        const rooms = [{ floor: 0, number: 1, rate: 50 }];

        // when
        await memoryRoomGateway.save(rooms);

        // then
        const actual = await memoryRoomGateway.get();
        const expected = [{ floor: 0, number: 1, rate: 50 }];
        expect(actual).to.deep.equal(expected);
      });
    });
    context('if the record already exist', function () {
      it('should replace it', async function () {
        // given
        const memoryRoomGateway = new MemoryRoomGateway();
        const rooms = [{ floor: 0, number: 1, rate: 100 }];

        // when
        await memoryRoomGateway.save(rooms);

        // then
        const actual = await memoryRoomGateway.get();
        const expected = [{ floor: 0, number: 1, rate: 100 }];
        expect(actual).to.deep.equal(expected);
      });
    });
  });
  describe('#get', function () {
    context('if a record exist', function () {
      it('should return it', async function () {
        // given
        const memoryRoomGateway = new MemoryRoomGateway();
        await memoryRoomGateway.save([{ floor: 0, number: 1, rate: 50 }]);

        // when
        const actual = await memoryRoomGateway.get();

        // then
        expect(actual).to.deep.equal([{ floor: 0, number: 1, rate: 50 }]);
      });
    });
  });
});
