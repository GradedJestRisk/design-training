let dbClient;

const fromDbClient = function (dbClientObject) {
  dbClient = dbClientObject;
  return { save, read };
};

const save = async function ({ id, licencePlate, color, wheelCount }) {
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
};

const read = async function (id) {
  let carRowStructure;
  try {
    carRowStructure = await dbClient
      .select()
      .from('car')
      .where('id', id)
      .first();
  } catch (error) {
    console.log(error);
  }

  if (carRowStructure === undefined) {
    return {
      found: false,
    };
  }

  return {
    found: true,
    car: {
      id: carRowStructure.id,
      color: carRowStructure.color,
      wheelCount: carRowStructure.wheel_count,
    },
  };
};

module.exports = { fromDbClient };
