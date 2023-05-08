import { knex } from '../database/database-client.js';

const get = async () => {
  const rooms = await knex.from('rooms').select();
  return rooms;
};

export { get };
