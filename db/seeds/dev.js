const { users, secrets } = require('../data');
const { formattedUsers } = require('../../utils/utils');
exports.seed = async function(knex) {
  await knex.migrate.rollback();
  await knex.migrate.latest();

  const amendedUsers = formattedUsers(users);
  await knex('users').insert(amendedUsers);
  await knex('secrets').insert(secrets);
};
