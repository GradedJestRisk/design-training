/* eslint-disable no-console */
import * as roomService from './room-service.js';
import * as roomRepository from './room-repository.js';

const main = async () => {
  const rooms = await roomService.get(roomRepository);

  console.log('This is all rooms we have:');

  rooms.map((room) => {
    console.log(`- room n°${room.number} is located on floor ${room.floor} and costs ${room.price} dollar per night`);
  });

  // eslint-disable-next-line node/no-process-exit,no-process-exit
  process.exit(0);
};

await main();
