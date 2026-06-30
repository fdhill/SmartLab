/**
 * @param {import('knex').Knex} knex
 */
exports.up = (knex) =>
  knex.schema.createTable('equipment', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('lab_id').unsigned().notNullable();
    t.string('name', 150).notNullable();
    t.string('code', 50).notNullable().unique();
    t.integer('quantity').unsigned().notNullable().defaultTo(1);
    t.enum('condition', ['good', 'minor_damage', 'major_damage']).notNullable().defaultTo('good');
    t.timestamp('created_at').defaultTo(knex.fn.now());

    t.foreign('lab_id').references('id').inTable('labs').onDelete('CASCADE');
  });

/**
 * @param {import('knex').Knex} knex
 */
exports.down = (knex) => knex.schema.dropTable('equipment');
