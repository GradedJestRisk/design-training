const read = async function ({ request, vehicleGateway, readVehicleUseCase }) {
  const id = request.params.id;

  const vehicle = await readVehicleUseCase(id, vehicleGateway);
  return {
    id: vehicle.id,
    color: vehicle.color,
  };
};

module.exports = { read };
