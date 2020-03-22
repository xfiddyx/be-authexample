module.exports = {
  client: 'pg',
  connection: {
    database: 'jwts'
  },
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};
