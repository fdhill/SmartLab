/**
 * @param {import('knex').Knex} knex
 */
exports.up = (knex) =>
  knex.schema.createTable('equipment_monitoring', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('equipment_id').unsigned().notNullable();
    t.integer('assistant_id').unsigned().notNullable();
    t.date('check_date').notNullable();
    t.enum('condition', ['good', 'minor_damage', 'major_damage']).notNullable();
    t.text('notes').nullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());

    t.foreign('equipment_id').references('id').inTable('equipment').onDelete('CASCADE');
    t.foreign('assistant_id').references('id').inTable('lab_assistants').onDelete('CASCADE');
  });

/**
 * @param {import('knex').Knex} knex
 */
exports.down = (knex) => knex.schema.dropTable('equipment_monitoring');
