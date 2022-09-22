/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('requests', function (table) {
    table.increments('id');
    table.integer('controller', 32).unsigned().references('users.id');
    table.integer('createdBy', 32).unsigned().references('users.id');
    table.integer('task', 32).unsigned().references('tasks.id');
    table.string('text', 255);
    table.string('status');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('requests');
};
