export default {
  client: 'postgres',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'service-user',
    database: 'service-user',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};
