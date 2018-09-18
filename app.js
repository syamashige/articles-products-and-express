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
