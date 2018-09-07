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

// // PUT - Edit A Product
// app.put('/products/new', (req, res) => {
//     const { id } = req.params;
//     const editProd = DS_Prod.getItemById(id);
//     if (req.body.name !== editProd.name) {
//         editProd.name = req.body.name;
//     }
//     if (req.body.price !== editProd.price) {
//         editProd.price = req.body.price;
//     }
//     if (req.body.inventory !== editProd.inventory) {
//         editProd.inventory = req.body.inventory
//     }
//     if (req.body.description !== editProd.description) {
//         editProd.description = req.body.description;
//     }
//     res.redirect('/products/:id')
// })

// // DELETE - Remove A Product By It's ID
// app.delete('/products/:id', (req, res) => {
//     const { id } = req.params;
//     let deletedProd = DS_Prod.removeItemById(id);
//     res.redirect('/products');
// })

    


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
app.get('/articles/:title', (req, res) => {
    const { title } = req.params;
    const arts = DS_Articles.getItemByTitle(title);
    res.render('artDetail', {arts});
})


app.listen(PORT, () => {
    console.log(`Started app on port: ${PORT}`)
});

// ***** In app.js ***** //
// const ItemRoutes = require('./routes/itemRoutes.js');
// app.use('/item', ItemRoutes); //this way you won't have to include /item in your router file (it will automatically include '/item')

//Router.use(myMiddleWareHere) // if you only want certain middleware to affect certain routes 


// ***** In Router file ***** //
// const Router = express.Router();
// Router.get('/item/new', (req, res) => { 
    
// })

// Router.post('/new', (req, res) => {

// })

// Router.put('/edit', (req, res) => {

// })

// Router.delete('/delete', (req, res) => {

// })

// module.export = Router