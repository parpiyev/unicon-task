// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'task',
      port: 5432,
      user: 'postgres',
      password: '12345',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'task',
      port: 5432,
      user: 'postgres',
      password: '12345',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'users',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'task',
      port: 5432,
      user: 'postgres',
      password: '12345',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'users',
    },
  },
};
