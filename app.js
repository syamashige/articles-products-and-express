const express = require('express');
const app = express();
const bp = require('body-parser');
const exphbs = require('express-handlebars')
const Products = require('./db/products.js');
const DS_Prod = new Products();
const Articles = require('./db/articles.js')
const DS_Articles = new Articles();

const PORT = process.env.PORT || 8000;

app.use(express.static('public'));

app.use(bp.urlencoded({ extended: true }));

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// GET - Home Page
app.get('/', (req, res) => {
    // res.send('IZ WORKING?')
    res.render('home');
});

//GET form
app.get('/products/new', (req, res) => {
    res.render('form');
})

// GET - Products Page
app.get('/products', (req, res) => {
    const allProds = DS_Prod.all();
    res.render('products', { allProds });
});
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const prods = DS_Prod
        .getItemById(id)
    // console.log('prods', prods);
    res.render('detail', prods)
})

// GET - Articles Page
app.get('/articles', (req, res) => {
    res.render('articles');
})

// POST - New Products 
app.post('/products/new', (req, res) => {
    console.log('new product req.body', req.body);
    // console.log('this.storage?', )
    const prod = req.body;
    DS_Prod.add(prod); 
    res.redirect('/products');
})

// PUT - Edit A Product

// DELETE - Remove A Product By It's ID





app.listen(PORT, () => {
    console.log(`Started app on port: ${PORT}`)
});