/**
 * @param {import('knex').Knex} knex
 */
exports.up = (knex) =>
  knex.schema.createTable('assistant_assignments', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('assistant_id').unsigned().notNullable();
    t.integer('lab_id').unsigned().notNullable();
    t.enum('day', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']).notNullable();
    t.enum('shift', ['morning', 'afternoon', 'evening']).notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());

    t.foreign('assistant_id').references('id').inTable('lab_assistants').onDelete('CASCADE');
    t.foreign('lab_id').references('id').inTable('labs').onDelete('CASCADE');
  });

/**
 * @param {import('knex').Knex} knex
 */
exports.down = (knex) => knex.schema.dropTable('assistant_assignments');
