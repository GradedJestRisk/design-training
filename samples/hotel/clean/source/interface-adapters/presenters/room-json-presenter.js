const RoomJsonPresenter = class {
  constructor() {
    this.rooms = '';
  }
  execute(rooms) {
    this.rooms = rooms;
  }
  get() {
    return JSON.stringify({ rooms: this.rooms });
  }
};

export { RoomJsonPresenter };
