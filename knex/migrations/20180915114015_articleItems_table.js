exports.up = function (knex, Promise) {
  return knex.schema.createTable('article_items', function (table) {
    table.increments();
    table.string('title').notNullable();
    table.string('body').notNullable();
    table.string('author').notNullable();
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('article_items');
}