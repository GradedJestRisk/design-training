const seed = async function (knex) {
  await knex('rooms').truncate();
  const rooms = [
    { floor: 0, number: 1, rate: 50 },
    { floor: 0, number: 2, rate: 50 },
    { floor: 1, number: 101, rate: 53.5 },
    { floor: 1, number: 102, rate: 53.5 },
    { floor: 1, number: 103, rate: 53.5 },
    { floor: 2, number: 201, rate: 61 },
    { floor: 2, number: 202, rate: 61 },
    { floor: 3, number: 301, rate: 66.5 },
  ];
  await knex('rooms').insert(rooms);
};
export { seed };
