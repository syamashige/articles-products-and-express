exports.seed = function (knex, Promise) {
  //Deletes ALL existing entries
  return knex('article_items').del()
    .then(function () {
      //Inserts seed entries
      return knex('article_items').insert([
        { title: 'kolohe goes fishing', body: 'malama da aina', author: 'jh' },
        { title: 'Planets', body: 'There are 9 planets', author: 'bob' },
        { title: 'Fireworks', body: 'If you watch it from the side is it round or flat?', author: 'Genki Kawamura' }
      ]);
    });
};