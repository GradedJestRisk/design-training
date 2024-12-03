export default {
  client: 'postgres',
  connection: {
    host: 'localhost',
    port: 5433,
    user: 'user',
    password: 'password',
    database: 'hotel',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};
