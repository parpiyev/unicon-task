/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('tasks', function (table) {
    table.increments('id');
    table.string('title', 255).notNullable();
    table.string('discription', 255).notNullable();
    table.specificType('recipients', 'INT[]').notNullable();
    table.integer('createdBy', 32).unsigned().references('users.id');
    table.boolean('isDeleted').defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('tasks');
};
