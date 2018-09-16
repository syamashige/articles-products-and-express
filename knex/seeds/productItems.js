exports.seed = function (knex, Promise) {
  //Deletes ALL existing entries
  return knex('product_items').del()
    .then(function () {
      //Inserts seed entries
      return knex('product_items').insert([
        { name: 'Surfboards', price: '700', inventory: '50' },
        { name: 'Paddleboard', price: '400', inventory: '3' },
        { name: 'Macbook', price: '1132', inventory: '12' }
      ]);
    });
};