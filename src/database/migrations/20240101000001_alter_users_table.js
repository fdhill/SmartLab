/**
 * @param {import('knex').Knex} knex
 */
exports.up = (knex) =>
  knex.schema.alterTable('users', (t) => {
    t.string('password', 255).notNullable().after('email');
    t.enum('role', ['admin', 'lecturer', 'student', 'assistant']).notNullable().after('password');
    t.string('phone_number', 20).nullable().after('role');
  });

/**
 * @param {import('knex').Knex} knex
 */
exports.down = (knex) =>
  knex.schema.alterTable('users', (t) => {
    t.dropColumn('password');
    t.dropColumn('role');
    t.dropColumn('phone_number');
  });
