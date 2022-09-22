/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('tasks').del();
  await knex('tasks').insert([
    {
      id: 1,
      title: 'title #1',
      discription: 'discription #1',
      recipients: [2, 3],
      createdBy: 1,
    },
    {
      id: 2,
      title: 'title #2',
      discription: 'discription #2',
      recipients: [2, 3],
      createdBy: 1,
    },
    {
      id: 3,
      title: 'title #3',
      discription: 'discription #3',
      recipients: [2, 3],
      createdBy: 1,
    },
    {
      id: 4,
      title: 'title #4',
      discription: 'discription #4',
      recipients: [2, 3],
      createdBy: 1,
    },
    {
      id: 5,
      title: 'title #5',
      discription: 'discription #5',
      recipients: [2, 3],
      createdBy: 1,
    },
    {
      id: 6,
      title: 'title #6',
      discription: 'discription #6',
      recipients: [2, 3],
      createdBy: 1,
    },
    {
      id: 7,
      title: 'title #7',
      discription: 'discription #7',
      recipients: [2, 3],
      createdBy: 1,
    },
    {
      id: 8,
      title: 'title #8',
      discription: 'discription #8',
      recipients: [2, 3],
      createdBy: 1,
    },
    {
      id: 9,
      title: 'title #9',
      discription: 'discription #9',
      recipients: [2, 3],
      createdBy: 1,
    },
    {
      id: 10,
      title: 'title #10',
      discription: 'discription #10',
      recipients: [2, 3],
      createdBy: 1,
    },
    {
      id: 11,
      title: 'title #11',
      discription: 'discription #11',
      recipients: [2, 3],
      createdBy: 1,
    },
    {
      id: 12,
      title: 'title #12',
      discription: 'discription #12',
      recipients: [2, 3],
      createdBy: 1,
    },
    {
      id: 13,
      title: 'title #13',
      discription: 'discription #13',
      recipients: [2, 3],
      createdBy: 1,
    },
    {
      id: 14,
      title: 'title #14',
      discription: 'discription #14',
      recipients: [5, 6],
      createdBy: 1,
    },
    {
      id: 15,
      title: 'title #15',
      discription: 'discription #15',
      recipients: [5, 6],
      createdBy: 1,
    },
    {
      id: 16,
      title: 'title #16',
      discription: 'discription #16',
      recipients: [5, 6],
      createdBy: 1,
    },
    {
      id: 17,
      title: 'title #17',
      discription: 'discription #17',
      recipients: [5, 6],
      createdBy: 1,
    },
    {
      id: 18,
      title: 'title #18',
      discription: 'discription #18',
      recipients: [5, 6],
      createdBy: 1,
    },
    {
      id: 19,
      title: 'title #19',
      discription: 'discription #19',
      recipients: [5, 6],
      createdBy: 1,
    },
    {
      id: 20,
      title: 'title #20',
      discription: 'discription #20',
      recipients: [5, 6],
      createdBy: 1,
    },
  ]);
};
