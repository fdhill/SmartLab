/**
 * @param {import('knex').Knex} knex
 */
exports.up = (knex) =>
  knex.schema.createTable('course_schedules', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('lab_id').unsigned().notNullable();
    t.integer('course_id').unsigned().notNullable();
    t.integer('lecturer_id').unsigned().notNullable();
    t.enum('day', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']).notNullable();
    t.time('start_time').notNullable();
    t.time('end_time').notNullable();
    t.string('class', 10).notNullable();
    t.string('semester', 20).notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());

    t.foreign('lab_id').references('id').inTable('labs').onDelete('CASCADE');
    t.foreign('course_id').references('id').inTable('courses').onDelete('CASCADE');
    t.foreign('lecturer_id').references('id').inTable('users').onDelete('CASCADE');
  });

/**
 * @param {import('knex').Knex} knex
 */
exports.down = (knex) => knex.schema.dropTable('course_schedules');
