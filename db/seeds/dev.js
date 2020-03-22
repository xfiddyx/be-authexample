const { users, secrets } = require('../data');

exports.seed = async function(knex) {
  await knex.migrate.rollback();
  await knex.migrate.latest();
  await knex('users').insert(users);
  await knex('secrets').insert(secrets);
};
