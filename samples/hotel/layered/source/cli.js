import * as roomService from './room-service.js';
import * as roomRepository from './room-repository.js';

const main = async () => {
  const rooms = await roomService.get(roomRepository);
  // eslint-disable-next-line no-console
  console.log('This is all rooms we have:');
  // eslint-disable-next-line no-console
  rooms.map((room) => {
    // eslint-disable-next-line no-console
    console.log(`- room n°${room.number} is located on floor ${room.floor} and costs ${room.price} dollar per night`);
  });
  let process;
  // eslint-disable-next-line node/no-process-exit,no-process-exit
  process.exit(0);
};

await main();
