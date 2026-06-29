/**
 * @param {import('knex').Knex} knex
 */
exports.up = (knex) =>
  knex.schema.createTable('users', (t) => {
    t.increments('id').unsigned().primary();
    t.string('name', 100).notNullable();
    t.string('email', 150).notNullable().unique();
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });

/**
 * @param {import('knex').Knex} knex
 */
exports.down = (knex) => knex.schema.dropTable('users');
