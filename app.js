const express = require('express');
const methodOverride = require('method-override');
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

// app.use(methodOverride('_method'));

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// GET - Home Page
app.get('/', (req, res) => {
    // res.send('IZ WORKING?')
    res.render('home');
});

// ***** PRODUCTS ***** //

//GET form
app.get('/products/new', (req, res) => {
    res.render('form');
})

// GET - Products Page
app.get('/products', (req, res) => {
    const allProds = DS_Prod.all();
    res.render('products', { allProds });
});

// GET Products by Id
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const prods = DS_Prod
        .getItemById(id)
    // console.log('prods', prods);
    res.render('detail', prods)
})

// POST - New Products 
app.post('/products/new', (req, res) => {
    const { id } = req.params;
    const prods = DS_Prod.getItemById(id);
    const prod = req.body;
    DS_Prod.add(prod);
    res.redirect('/products');
});


// ****** ARTICLES ****** //

// GET - Articles Page
app.get('/articles', (req, res) => {
    const allArticles = DS_Articles.all();
    res.render('articles', { allArticles });
});

// GET - Articles Form
app.get('/articles/new', (req, res) => {
    res.render('artForm')
})

// POST - New Articles 
app.post('/articles/new', (req, res) => {
    const { title } = req.params;
    const arts = DS_Articles.getItemByTitle(title);
    const newArticle = req.body;
    DS_Articles.add(newArticle);
    res.redirect('/articles');

})

// GET - Get Articles by Title
// Not showing the title or any of the information inputted
app.get('/articles/:title', (req, res) => {
    const { title } = req.params;
    const arts = DS_Articles.getItemByTitle(title);
    res.render('artDetail', {arts});
})


app.listen(PORT, () => {
    console.log(`Started app on port: ${PORT}`)
});
