const express = require('express');
const app = express();

const methodOverride = require('method-override');
const bp = require('body-parser');
const exphbs = require('express-handlebars')

const Products = require('./db/products.js');
const DS_Prod = new Products();

const Articles = require('./db/articles.js')
const DS_Articles = new Articles();

const productRouter = require('./routes/products.js');
const articleRouter = require('./routes/articles.js');

// const knex = require('./knex/knex.js');

app.use(express.static('public'));

app.use(bp.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// GET - Home Page
app.get('/', (req, res) => {
    console.log('Home Page')
    res.render('home');
});

app.use('/', productRouter);
app.use('/', articleRouter);

app.listen(process.env.EXPRESS_CONTAINER_PORT, () => {
    console.log(`Started app on port: ${process.env.EXPRESS_CONTAINER_PORT}`)
});

// ***** PRODUCTS ***** //

// //GET - Create New Products Form
// app.get('/products/new', (req, res) => {
//     console.log('Products Form')
//     res.render('form');
// })

// // GET - Products Page
// app.get('/products', (req, res) => {
//     console.log("Hello?")
//     knex.raw('SELECT * FROM products')    
//         .then(results => {
//             console.log("IZ GET PRODUCTTS??")
//             console.log('results', results);
//               const products = results.rows
//             res.render('products', { products })    
//         })
//         .catch(err => {
//         console.log('error', err)
//     })
// })

// // GET Products by Id
// app.get('/products/:id', (req, res) => {
//     const { id } = req.params;
//     console.log('Product ID', id);
//     console.log('Hitting Get Products by ID')
//     knex.raw(`SELECT * FROM products`)
//         .then(results => {
//             // console.log('product by id', results);
//             const products = results.rows[(id-1)];
//             res.render('detail', { products });
//         })
//         .catch(err => {
//             console.log('error getting product by id', err);
//         })
// })


// // POST - New Products 
// app.post('/products/new', (req, res) => {
//     console.log('New Product')
//     const { prodName, prodPrice, prodInventory, prodDescription } = req.body;
//     // console.log('req.body', req.body);
//     // console.log('prodName', prodName);
//     // console.log('name.name', req.body.name);

//     knex.raw(`INSERT INTO products(name, price, inventory, description) VALUES ('${req.body.name}', '${req.body.price}', '${req.body.inventory}', '${req.body.description}')`)
//         .then(results => {
//             console.log('insert results', results);
//             res.redirect('/products');
//         })
//         .catch(err => {
//             console.log('error', err);
//         });

// });

// // Display the edit form
// app.get('/products/:id/edit', (req, res) => {
//     console.log('Edit Form?')
    
//     res.render('edit');
// });

// // PUT - Edits A Product ()
// // Edit product by id 
// app.put('/products/:id/edit', (req, res) => {
//     const { id } = req.params;
//     knex.raw(`SELECT * FROM products WHERE ${id} = ${products.id} UPDATE products SET name=${req.body.name}, price=${req.body.price}, inventory=${req.body.inventory}, body=${req.body.description}`)
//         .then(results => {
//             res.redirect('/products/:id');
//         })
//         .catch(err => {
//             console.log('error', err);
//     })
//     // Target product by id 
//     // const prodToEdit = DS_Prod.getItemById(id);
//     // If the new product name doesn't match the existing name - then set product name to new input
//     // If the new product price doesn't match the existing price - then set product price to new input value
//     // If the new product inventory doesn't match the exisitng inventory - then set product inventory to new input value
//     // If the new product description doesn't match the existing description - then set product description to new input value


//     // Redirect to the product's page with the edits in place
// //     res.redirect('/products/:id')
// // })

// // DELETE - Delete A Product 



// ****** ARTICLES ****** //

// GET - Articles Page
// app.get('/articles', (req, res) => {
//     knex.raw('SELECT * FROM articles')
//         .then(results => {
//             console.log("IZ GET ARTICLES??");
//             console.log('article results', results);
//             const articles = results.rows;
//             res.render('articles', { articles });
//         })
//         .catch(err => {
//         console.log('error', err)
//     })
// });

// // GET - Create New Articles Form
// app.get('/articles/new', (req, res) => {
//     res.render('artForm')
// })

// // POST - New Articles 
// app.post('/articles/new', (req, res) => {
//     const { title, author, body } = req.body;
//     console.log('req.body', req.body);
//     console.log('title', title);

//     knex.raw(`INSERT INTO articles (title, author, body) VALUES ('${req.body.title}', '${req.body.author}','${req.body.body}')`)
//         .then(results => {
//             console.log('insert articles', results);
//             res.redirect('/articles');
//         })
//         .catch(err => {
//             console.log('error', err);
//         })
// });

// // GET - Get Articles by Title
// app.get('/articles/:title', (req, res) => {
//     console.log('get articles by title', req.params);
    
//     knex.raw(`SELECT * FROM articles`)
//         .then(results => {
//             const { title } = req.params;
//             // const { title } = req.body;
//             console.log('articles by id', title);
//             const articles = results.rows;
//             console.log('results.rows[title]', results.rows[title]);
//             res.render('artDetail', { articles });
//         })
//         .catch(err => {
//             console.log('error getting articles by title', err);
//     })
// })



