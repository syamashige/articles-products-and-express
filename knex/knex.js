const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];

module.exports = require('knex')(config);



// const knex = require('knex');
// const myConnection = knex.config({
//   host:
//     port:
//   dbname:
//     username:
// });

// myConnectionraw('SELECT * FROM productItems')
//   .then((data) => {
//     console.log(data);
//   });