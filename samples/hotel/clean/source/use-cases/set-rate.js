import { Room } from '../entities/Room.js';
const setRate = function ({ roomRepository, roomPresenter, baseRate }) {
  const roomsDTO = roomRepository.get();
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
  roomRepository.save(updatedRoomsDTO);
  roomPresenter.execute(updatedRoomsDTO);
};
export { setRate };
