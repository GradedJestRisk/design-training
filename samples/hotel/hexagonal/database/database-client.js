import Knex from 'knex';
import * as knexConfiguration from './knexfile.js';
const knex = Knex(knexConfiguration.default);
export { knex };
