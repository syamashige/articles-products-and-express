
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('articles').del()
    .then(function () {
      // Inserts seed entries
      return knex('articles').insert([
        {title:'Wuthering Heights', author:'Emily Bronte', body:"Wuthering Heights is a wild, passionate story of the intense and almost demonic love."},
        {title: 'The Body Library', author:'Jeff Noon', body:"In a city dissolving into an infected sprawl of ideas, the dead man’s impossible whispers plunge him into a murder investigation like no other."},
        {title:'Bird Box', author:'Josh Malerman', body:"Something is out there, something terrifying that must not be seen. One glimpse of it, and a person is driven to deadly violence. No one knows what it is or where it came from."}
      ]);
    });
};
