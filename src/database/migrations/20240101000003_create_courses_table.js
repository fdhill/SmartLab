/**
 * @param {import('knex').Knex} knex
 */
exports.up = (knex) =>
  knex.schema.createTable('courses', (t) => {
    t.increments('id').unsigned().primary();
    t.string('code', 20).notNullable().unique();
    t.string('name', 150).notNullable();
    t.tinyint('credits').unsigned().notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });

/**
 * @param {import('knex').Knex} knex
 */
exports.down = (knex) => knex.schema.dropTable('courses');
