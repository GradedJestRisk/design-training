import * as roomService from './room-service.js';
import * as roomRepository from './room-repository.js';
import * as http from 'http';
const PORT = 3000;
const headers = { 'Content-Type': 'application/json' };

const router = async function (request, response) {
  if (request.url == '/rooms') {
    const rooms = await roomService.get(roomRepository);
    response.writeHead(200, headers);
    response.write(JSON.stringify(rooms));
    response.end();
  } else {
    response.writeHead(404, headers);
    response.write('Not found');
  }
  response.end();
};
const main = async () => {
  const server = http.createServer(router);
  await server.listen(PORT);
  // eslint-disable-next-line no-console
  console.log(`Waiting for requests at port ${PORT}`);
};

await main();
