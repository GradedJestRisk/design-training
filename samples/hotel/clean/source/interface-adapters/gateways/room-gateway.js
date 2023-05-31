import { knex } from '../../../database/database-client.js';
const save = async function (rooms) {
  await knex.from('rooms').delete(rooms);
  await knex.from('rooms').insert(rooms);
};

export { save };
