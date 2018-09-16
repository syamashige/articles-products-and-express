const express = require('express');
const app = express();

const methodOverride = require('method-override');
const bp = require('body-parser');
const exphbs = require('express-handlebars')

const Products = require('./db/products.js');
const DS_Prod = new Products();

const Articles = require('./db/articles.js')
const DS_Articles = new Articles();


// const PORT = process.env.PORT || 8000;

const knex = require('./knex/knex.js');
// knex.raw('SELECT * FROM products')
//     .then(results => {
//         console.log('Results', results);
//     })
//     .catch(err => {
//         console.log('error', err);
//     });

app.use(express.static('public'));

app.use(bp.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// GET - Home Page
app.get('/', (req, res) => {
    // res.send('IZ WORKING?')
    res.render('home');
});

// ***** PRODUCTS ***** //

//GET - Create New Products Form
app.get('/products/new', (req, res) => {
    res.render('form');
})

// GET - Products Page
app.get('/products', (req, res) => {
    console.log("Hello?")
    // const allProds = DS_Prod.all();
    // res.render('products', { allProds });
    // knex.raw('SELECT * FROM products')
    // DS_Prod.all()
    // let test = DS_Prod.all();
    // console.log('test', test);
    knex.raw('SELECT * FROM products')    
        .then(results => {
            console.log("IZ GET PRODUCTTS??")
            console.log('results', results);
              const products = results.rows
            res.render('products', { products })    
        })
        .catch(err => {
        console.log('error', err)
    })
})

// GET Products by Id
app.get('/products/:id', (req, res) => {
    // const { id } = req.params;
    console.log('get product by id req.params', req.params)
    // const prods = DS_Prod
    //     .getItemById(id)
    // res.render('detail', prods)
    knex.raw(`SELECT * FROM products`)
        .then(results => {
            const { id } = req.params;
            console.log('product by id', results);
            const products = results.rows[(id-1)];
            console.log('results.rows[id]', results.rows[id]);
            res.render('detail', { products });
        })
        .catch(err => {
            console.log('error getting product by id', err);
        })
})


// POST - New Products 
app.post('/products/new', (req, res) => {
    // const { } = req.params;
    // console.log('req', req);
    // console.log('res', res);
    // console.log('req.params', req.params)

    // console.log('body', req.body);
    // const prods = DS_Prod.getItemById(id);
    // const prod = req.body;
    // DS_Prod.add(prod);
    // res.redirect('/products');
    const { prodName, prodPrice, prodInventory, prodDescription } = req.body;
    console.log('req.body', req.body);
    console.log('prodName', prodName);
    console.log('name.name', req.body.name);

    knex.raw(`INSERT INTO products(name, price, inventory, description) VALUES ('${req.body.name}', '${req.body.price}', '${req.body.inventory}', '${req.body.description}')`)
        .then(results => {
            console.log('insert results', results);
            res.redirect('/products');
        })
        .catch(err => {
            console.log('error', err);
        });

});

// PUT - Edits A Product ()
// Edit product by id 
app.put('/products/:id/edit', (req, res) => {
    const { id } = req.params;
    // Target product by id 
    const prodToEdit = DS_Prod.getItemById(id);
    // If the new product name doesn't match the existing name - then set product name to new input
    // If the new product price doesn't match the existing price - then set product price to new input value
    // If the new product inventory doesn't match the exisitng inventory - then set product inventory to new input value
    // If the new product description doesn't match the existing description - then set product description to new input value

    // Redirect to the product's page with the edits in place
    res.redirect('/products/:id')
})

// DELETE - Delete A Product 



// ****** ARTICLES ****** //

// GET - Articles Page
app.get('/articles', (req, res) => {
    // const allArticles = DS_Articles.all();
    // res.render('articles', { allArticles });
    knex.raw('SELECT * FROM articles')
        .then(results => {
            console.log("IZ GET ARTICLES??");
            console.log('article results', results);
            
    })
});

// GET - Create New Articles Form
app.get('/articles/new', (req, res) => {
    res.render('artForm')
})

// POST - New Articles 
app.post('/articles/new', (req, res) => {
    // const { title } = req.params;
    // const arts = DS_Articles.getItemByTitle(title);
    // const newArticle = req.body;
    // DS_Articles.add(newArticle);
    // res.redirect('/articles');
})

// GET - Get Articles by Title
app.get('/articles/:title', (req, res) => {
    const { title } = req.params;
    const targetArticle = DS_Articles.getItemByTitle(title);
    res.render('artDetail', targetArticle);
})


app.listen(process.env.EXPRESS_CONTAINER_PORT, () => {
    console.log(`Started app on port: ${process.env.EXPRESS_CONTAINER_PORT}`)
});
