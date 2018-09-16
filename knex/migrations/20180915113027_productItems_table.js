exports.up = function (knex, Promise) {
  return knex.schema.createTable('product_items', function (table) {
    table.increments();
    table.string('name').notNullable();
    table.string('price').notNullable();
    table.string('inventory').notNullable();
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('product_items');
}