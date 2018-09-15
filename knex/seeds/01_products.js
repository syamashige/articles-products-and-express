
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        { name: 'Product 1', price: '1', inventory: '1', description:'insert product description here'},
        {name: 'Product 2', price: '2', inventory: '2', description: 'insert product description here'},
      ]);
    });
};
