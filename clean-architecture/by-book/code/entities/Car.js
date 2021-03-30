class Car {
  constructor({ id, color = 'black' }) {
    this.id = id;
    this.color = color;
    this.wheelCount = 4;
    this.licencePlate = this.generateLicencePlate();
  }

  generateLicencePlate() {
    return `${this.color.substring(0, 2)}-AB-${this.id.substring(0, 3)}`;
  }
}

module.exports = Car;
