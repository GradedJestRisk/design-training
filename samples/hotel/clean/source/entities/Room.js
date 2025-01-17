const CEILING_RATE = 200;

const Room = class {
  constructor({ number, floor, rate }) {
    this.number = number;
    this.floor = floor;
    this.rate = rate;
  }

  setRate({ baseRate }) {
    let newRate;
    if (this.floor === 0) {
      newRate = baseRate;
    } else if (this.floor === 1) {
      newRate = baseRate * 1.07;
    } else if (this.floor === 2) {
      newRate = baseRate * 1.22;
    } else if (this.floor === 3) {
      newRate = baseRate * 1.33;
    }

    if (newRate <= CEILING_RATE) {
      this.rate = newRate;
    } else {
      this.rate = CEILING_RATE;
    }
  }
};

export { Room };
