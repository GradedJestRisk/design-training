import { RoomJsonPresenter } from './interface-adapters/presenters/room-json-presenter.js';
import { MemoryRoomGateway } from './interface-adapters/gateways/memory-room-gateway.js';
import { RoomJsonController } from './interface-adapters/controllers/room-json-controller.js';

const main = async function () {
  const roomPresenter = new RoomJsonPresenter();
  const roomGateway = new MemoryRoomGateway();
  const controller = new RoomJsonController({ roomPresenter, roomGateway });
  await controller.route();
};

await main();
