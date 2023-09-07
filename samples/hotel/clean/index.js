import { RoomJsonPresenter } from './source/interface-adapters/presenters/room-json-presenter.js';
import * as databaseRoomGateway from './source/interface-adapters/gateways/database-room-gateway.js';
import { RoomJsonController } from './source/interface-adapters/controllers/room-json-controller.js';

const main = async function () {
  const roomPresenter = new RoomJsonPresenter();
  const roomGateway = databaseRoomGateway;
  const controller = new RoomJsonController({ roomPresenter, roomGateway });
  await controller.route();
};

await main();
