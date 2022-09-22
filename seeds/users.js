/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        {
          firstName: 'firstName #1',
          lastName: 'lastName #1',
          isController: true,
          email: 'example1@nest.it',
          password: '12345',
        },
        {
          firstName: 'firstName #2',
          lastName: 'lastName #2',
          email: 'example2@nest.it',
          password: '12345',
        },
        {
          firstName: 'firstName #3',
          lastName: 'lastName #3',
          email: 'example3@nest.it',
          password: '12345',
        },
      ]);
    });
};
