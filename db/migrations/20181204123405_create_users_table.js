exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('user_id').primary();
    table.text('username');
    table.text('password');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
