const MemoryRoomGateway = class {
  constructor() {
    this.rooms = [];
  }

  async save(rooms) {
    this.rooms = rooms;
  }

  async get() {
    return this.rooms;
  }
};

export { MemoryRoomGateway };
