// Update with your config settings.

module.exports = {
  test: {
    client: 'pg',
    connection: {
      user : 'postgres',
      database : 'program_muscu_test',
      password : 'root',
      host :  'localhost',
      port : '5432'
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/test'
    }
  },
  development: {
    client: 'pg',
    connection: {
      user : 'postgres',
      database : 'program_muscu',
      password : 'root',
      host :  'localhost',
      port : '5432'
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    }
  },
  production: {
    client: 'pg',
    connection: {
      user : process.env.PGUSER,
      database : process.env.PGDATABASE,
      password : process.env.PGPASSWORD,
      host : process.env.PGHOST
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/production'
    }
  }
};