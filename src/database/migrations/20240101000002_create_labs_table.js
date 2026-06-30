/**
 * @param {import('knex').Knex} knex
 */
exports.up = (knex) =>
  knex.schema.createTable('labs', (t) => {
    t.increments('id').unsigned().primary();
    t.string('name', 100).notNullable();
    t.string('location', 150).notNullable();
    t.integer('capacity').unsigned().notNullable();
    t.enum('status', ['active', 'inactive', 'maintenance']).notNullable().defaultTo('active');
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });

/**
 * @param {import('knex').Knex} knex
 */
exports.down = (knex) => knex.schema.dropTable('labs');
