import { Room } from '../entities/Room.js';
const setRate = async function ({ roomGateway, roomPresenter, baseRate }) {
  const roomsDTO = await roomGateway.get();
  const rooms = roomsDTO.map(({ number, floor, rate }) => {
    return new Room({ number, floor, rate });
  });
  const updatedRooms = rooms.map((room) => {
    room.setRate({ baseRate });
    return room;
  });
  const updatedRoomsDTO = updatedRooms.map(({ number, floor, rate }) => {
    return { number, floor, rate };
  });
  await roomGateway.save(updatedRoomsDTO);
  roomPresenter.execute(updatedRoomsDTO);
};
export { setRate };
