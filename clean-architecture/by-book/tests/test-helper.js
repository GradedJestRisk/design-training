const dbClient = require('../database/actual-db-client').fromEnvironment(
  process.env,
);

const identifier = require('../code/frameworks-drivers/identifier');

const createCar = async function ({ color }) {
  const id = identifier.get();

  try {
    await dbClient('vehicle').insert({ id, color, wheel_count: 4 });
  } catch (error) {
    console.log(error);
  }
  return id;
};

const createVehicle = async function ({ color, wheelCount }) {
  const id = identifier.get();
  const licencePlate = `${color.substring(0, 2)}-AB-${id.substring(0, 3)}`;
  try {
    await dbClient('vehicle').insert({
      id,
      licence_plate: licencePlate,
      color,
      wheel_count: wheelCount,
    });
  } catch (error) {
    console.log(error);
  }

  return id;
};

const emptyVehicles = async function () {
  try {
    await dbClient('vehicle').truncate();
  } catch (error) {
    console.log(error);
  }
};

const readCar = async function (id) {
  let car;
  try {
    car = await dbClient.select().from('vehicle').where('id', id).first();
  } catch (error) {
    console.log(error);
  }
  return {
    id: car.id,
    licencePlate: car.licence_plate,
    color: car.color,
    wheelCount: car.wheel_count,
  };
};

module.exports = { createCar, emptyVehicles, readCar, createVehicle };
