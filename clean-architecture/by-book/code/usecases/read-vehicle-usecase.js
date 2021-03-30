const execute = async function (id, vehicleGateway) {
  const vehicle = await vehicleGateway.read(id);

  return {
    id: vehicle.id,
    color: vehicle.color,
    wheelCount: vehicle.wheelCount,
  };
};

module.exports = execute;
