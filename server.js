const express = require('express');
const app = express();
const PORT = process.env.PORT || 8002;
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const Products = require('./db/products.js');
const DB_Products = new Products();
//const Articles = require('./db/articles.js');
//const DB_Articles = new Articles();

//Tells Express to use a static directory that we define as the location to look for requests
app.use(express.static("public"));

//For parsing application/x-www-form-urlencoded. Returns the already parsed information/object as "req.body".
app.use(bodyParser.urlencoded({ extended: true }));

//Creates a super simple Express app; basic way to register a Handlebars view engine
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

/////////////////////////////////////////

//////////////////
//Product Routes//
//////////////////

//POST '/products'
app.post("/products", (req, res) => {

});

//PUT '/products/:id'
app.put("/products/:id", (req, res) => {

});

//DELETE '/products/:id'
app.delete("/products/:id", (req, res) => {

});

//Product routes below will output HTML generated from TMEPLATE ENGINE
//GET '/products/new'
app.get("/products/new", (req, res) => {
  console.log("This is GET products - new");
  //responds with HTML generated from templates. HTML should contain an EMPTY form which a user will be able to create a new product. Form points to your server's route for creating a new product
  res.render("new");
});

//GET '/products'
app.get("/products", (req, res) => {
  console.log("\nThis is GET /products - index.hbs");
  const productItems = DB_Products.all();
  console.log("productItems:\n", productItems);
  res.render('index', { productItems });
});

//GET '/products/:id'
app.get("/products/:id", (req, res) => {
  console.log("This is GET /products/:id - product.hbs");
  //respond with HTML generated from template that displays the Products info for the product with the corresponding ID
  //console.log("req.params:", req.params);
  const { id } = req.params;
  console.log("id:", id);
  const selectedProductItem = DB_Products.getProductById(id);
  console.log("\nselectedProductItem:\n", selectedProductItem);
  res.render("product", selectedProductItem);
});

//GET '/products/:id/edit'
app.get("/products/:id/edit", (req, res) => {
  console.log("This is GET products - edit");
  //responds with HTML generated form templates. HTML should contain a form with values already prefilled? so that a user can update the information for a product. The form points to your server's route for editing a product.
  res.render("edit");
});


// //Render all products
// app.get("/", (req, res) => {
//   const item = DB_Products.all();
//   console.log("\nProducts:", item);
//   res.render("home", { item });
// });


// //Render out the product form
// app.get("/product/new", (req, res) => {
//   res.render("productForm");
// });

// //POST creates a new product (add)
// app.post("/product/new", (req, res) => {
//   console.log("req.body:", req.body);
//   const product = req.body;
//   DB_Products.add(product);
//   res.redirect('/');
// })






app.listen(PORT, () => {
  console.log(`Started app on port: ${PORT}`);
});