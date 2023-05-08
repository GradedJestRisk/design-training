const get = (roomRepository) => {
  return roomRepository.get();
};
const setRates = ({ roomRepository, baseRate }) => {
  const CEILING_RATE = 200;
  const rooms = roomRepository.get();
  const ratedRooms = rooms.map((room) => {
    if (room.floor === 0) {
      room.price = baseRate;
    }
    if (room.floor === 1) {
      room.price = baseRate * 1.07;
    }
    if (room.floor === 2) {
      room.price = baseRate * 1.22;
    }
    if (room.floor === 3) {
      room.price = baseRate * 1.33;
    }
    if (room.price > CEILING_RATE) {
      room.price = CEILING_RATE;
    }
    return room;
  });
  roomRepository.set(ratedRooms);
};
export { get, setRates };
