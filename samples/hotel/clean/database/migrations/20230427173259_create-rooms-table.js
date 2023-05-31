const up = async function (knex) {
  function table(t) {
    t.integer('number').primary();
    t.integer('floor').notNullable();
    t.double('price').notNullable();
  }

  await knex.schema.createTable('rooms', table);
};

const down = async function (knex) {
  await knex.schema.dropTable('rooms');
};

export { up, down };
