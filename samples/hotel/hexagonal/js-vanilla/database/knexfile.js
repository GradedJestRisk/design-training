export default {
  client: 'postgres',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'username',
    password: 'password',
    database: 'database',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};
