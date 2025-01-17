import * as http from 'http';
const PORT = 3000;
const headers = { 'Content-Type': 'application/json' };
import { setRate } from '../../use-cases/set-rate.js';

const RoomJsonController = class {

  constructor({ roomGateway, roomPresenter }) {
    this.roomGateway = roomGateway;
    this.roomPresenter = roomPresenter;
  }

  async router(request, response) {
    if (request.url === '/set-rate') {
      const baseRate = 70;
      await setRate({ roomGateway: this.roomGateway, roomPresenter: this.roomPresenter, baseRate});
      response.writeHead(200, headers);
      response.write(JSON.stringify(this.roomPresenter.get()));
      response.end();
    } else {
      response.writeHead(404, headers);
      response.write('Not found');
    }
    response.end();
  }

  async route() {
    this.server = http.createServer(this.router);
    await this.server.listen(PORT);
    // eslint-disable-next-line no-console
    console.log(`Waiting for requests at port ${PORT}`);
  }
};

export { RoomJsonController };
