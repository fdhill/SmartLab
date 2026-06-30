/**
 * @param {import('knex').Knex} knex
 */
exports.up = (knex) =>
  knex.schema.createTable('bookings', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('lab_id').unsigned().notNullable();
    t.integer('user_id').unsigned().notNullable();
    t.date('date').notNullable();
    t.time('start_time').notNullable();
    t.time('end_time').notNullable();
    t.enum('activity_type', ['practicum', 'research', 'seminar', 'other']).notNullable();
    t.text('purpose').notNullable();
    t.enum('status', ['pending', 'approved', 'rejected', 'completed']).notNullable().defaultTo('pending');
    t.timestamp('created_at').defaultTo(knex.fn.now());

    t.foreign('lab_id').references('id').inTable('labs').onDelete('CASCADE');
    t.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });

/**
 * @param {import('knex').Knex} knex
 */
exports.down = (knex) => knex.schema.dropTable('bookings');
