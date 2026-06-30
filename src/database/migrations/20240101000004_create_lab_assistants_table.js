/**
 * @param {import('knex').Knex} knex
 */
exports.up = (knex) =>
  knex.schema.createTable('lab_assistants', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('user_id').unsigned().notNullable();
    t.string('student_id', 20).notNullable().unique();
    t.string('period', 20).notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());

    t.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });

/**
 * @param {import('knex').Knex} knex
 */
exports.down = (knex) => knex.schema.dropTable('lab_assistants');
