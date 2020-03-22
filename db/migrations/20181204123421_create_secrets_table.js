exports.up = function(knex, Promise) {
  return knex.schema.createTable('secrets', table => {
    table.increments('secret_id').primary();
    table.text('secret_text');
    table.integer('user_id');
    table.foreign('user_id').references('users.user_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('secrets');
};
