const roomJsonPresenter = class {
  constructor() {
    this.rooms = '';
  }
  execute(rooms) {
    this.rooms = JSON.stringify({ rooms });
  }
  get() {
    return this.rooms;
  }
};

export { roomJsonPresenter };
