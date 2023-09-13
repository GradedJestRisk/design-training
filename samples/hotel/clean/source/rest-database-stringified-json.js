import { RoomJsonPresenter } from './interface-adapters/presenters/room-json-presenter.js';
import * as databaseRoomGateway from './interface-adapters/gateways/database-room-gateway.js';
import { RoomJsonController } from './interface-adapters/controllers/room-json-controller.js';

const main = async function () {
  const roomPresenter = new RoomJsonPresenter();
  const roomGateway = databaseRoomGateway;
  const controller = new RoomJsonController({ roomPresenter, roomGateway });
  await controller.route();
};

await main();
