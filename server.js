const express = require('express');
const app = express();
const PORT = process.env.PORT || 8002;
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

const productRoutes = require('./routes/products.js');
const articleRoutes = require('./routes/articles.js');

const Products = require('./db/products.js');
const DB_Products = new Products();
const Articles = require('./db/articles.js');
const DB_Articles = new Articles();

// let addingProductError = false;
// let addingArticleError = false;

//Tells Express to use a static directory that we define as the location to look for requests
app.use(express.static("public"));

//For parsing application/x-www-form-urlencoded. Returns the already parsed information/object as "req.body".
app.use(bodyParser.urlencoded({ extended: true }));

//Creates a super simple Express app; basic way to register a Handlebars view engine
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

//Setup for method-override
app.use(methodOverride('_method'));

/////////////////////////////////////////

//Render all products and articles; a homepage
app.get("/", (req, res) => {
  const allProducts = DB_Products.all();
  const allArticles = DB_Articles.all();
  console.log("\nProducts:\n", allProducts);
  console.log("\nArticles:\n", allArticles);
  res.render("home", { allProducts, allArticles });
});

app.use('/', productRoutes);

app.use('/', articleRoutes);


/////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
//Product routes below will output HTML generated from TEMPLATE ENGINE//
////////////////////////////////////////////////////////////////////////

// //GET '/products/new'; creates a new product
// app.get("/products/new", (req, res) => {
//   console.log("\nThis is GET /products/new - new.hbs");
//   const addingProduct = true;
//   res.render("new", { addingProduct });
// });

// //GET '/products/:id/edit'; user can update information for a product
// app.get("/products/:id/edit", (req, res) => {
//   console.log("\nThis is GET products - edit");
//   //console.log(req.params);
//   const { id } = req.params;
//   console.log("ID for edit:", id);
//   const editProductItem = DB_Products.getProductById(id);
//   res.render("edit", { editProductItem });
// });

// //GET '/products/:id'; displays the selected product's info with the corresponding ID
// app.get("/products/:id", (req, res) => {
//   console.log("\nThis is GET /products/:id - product.hbs");
//   //console.log("req.params:", req.params);
//   const { id } = req.params;
//   console.log("id:", id);
//   const selectedProductItem = DB_Products.getProductById(id);
//   console.log("selectedProductItem:\n", selectedProductItem);
//   res.render("product", selectedProductItem);
// });

// //GET '/products'; displays all Products add thus far
// app.get("/products", (req, res) => {
//   console.log("\nThis is GET /products - index.hbs");
//   const productItems = DB_Products.all();
//   console.log("productItems:\n", productItems);
//   res.render('index', { productItems });
// });

// //////////////////
// //Product Routes//
// //////////////////

// //POST '/products'
// app.post("/products", (req, res) => {
//   console.log("\nreq.body:\n", req.body);
//   if (req.body.name !== "" && req.body.price !== "" && req.body.inventory !== "") {
//     addingError = false;
//     req.body.price = Number(req.body.price);
//     req.body.inventory = Number(req.body.inventory);
//     const newProductItem = req.body;
//     DB_Products.add(newProductItem);
//     res.redirect("/products");
//   }
//   else {
//     addingProductError = true;
//     res.render("new", { addingProductError });
//   }
// });

// //PUT '/products/:id'
// app.put("/products/:id", (req, res) => {
//   console.log("\nreq.body @ products PUT:\n", req.body);
//   console.log("req.params:", req.params);
//   const { id } = req.params;
//   let productToEdit = DB_Products.getProductById(id);
//   console.log("\nproductToEdit:\n", productToEdit);
//   if (req.body.name === "" || req.body.price === "" || req.body.inventory === "") {
//     res.render("edit", { productToEdit });
//   }
//   else {
//     if (req.body.name !== productToEdit.name) {
//       productToEdit.name = req.body.name;
//     }
//     if (req.body.price !== productToEdit.price) {
//       productToEdit.price = req.body.price;
//     }
//     if (req.body.inventory !== productToEdit.inventory) {
//       productToEdit.inventory = req.body.inventory;
//     }
//     res.redirect(`/products/${id}`);
//   }
// });

// //DELETE '/products/:id'
// app.delete("/products/:id", (req, res) => {
//   console.log("\nThis is DELETE for products.");
//   console.log("req.params:", req.params);
//   const { id } = req.params;
//   //Find the product in storage and remove it
//   let deletedProduct = DB_Products.removeProductById(id);
//   console.log("\nCheck deletedProduct:", deletedProduct);
//   console.log("\nCheck remaining products:\n", DB_Products.all());

//   res.redirect('/products');
// });

///////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////
// //Article routes below will output HTML generated from our TEMPLATES //
// ////////////////////////////////////////////////////////////////////////

// //GET '/articles/new'
// app.get("/articles/new", (req, res) => {
//   console.log("\nThis is GET /articles/new - new.hbs");
//   const addingArticle = true;
//   res.render("new", { addingArticle });
// });

// //GET '/articles/:title/edit'
// app.get("/articles/:title/edit", (req, res) => {
//   console.log("\nThis is GET articles - edit");
//   //console.log("req.params:", req.params);
//   const { title } = req.params;
//   console.log("Title for edit:", title);
//   const editArticleItem = DB_Articles.getArticleByTitle(title);
//   res.render("edit", { editArticleItem });
// });

// //GET '/articles/:title'
// app.get("/articles/:title", (req, res) => {
//   console.log("\nThis is GET /articles/:title - articles.hbs");
//   //console.log("req.params:", req.params);
//   const { title } = req.params;
//   console.log("title:", title);
//   const selectedArticleItem = DB_Articles.getArticleByTitle(title);
//   console.log("\nselectedArticleItem:\n", selectedArticleItem);
//   res.render("article", selectedArticleItem);

// });

// //GET '/articles'
// app.get("/articles", (req, res) => {
//   console.log("\nThis is GET /articles - index.hbs");
//   const articleItems = DB_Articles.all();
//   console.log("articleItems:\n", articleItems);
//   res.render('index', { articleItems });
// });

// //////////////////
// //Article Routes//
// //////////////////

// //POST '/articles'
// app.post("/articles", (req, res) => {
//   console.log("\nreq.body:\n", req.body);
//   if (req.body.title !== "" && req.body.body !== "" && req.body.author !== "") {
//     const newArticleItem = req.body;
//     DB_Articles.add(newArticleItem);
//     res.redirect("/articles");
//   }
//   else {
//     addingArticleError = true;
//     res.render("new", { addingArticleError });
//   }
// });

// //PUT '/articles/:title'
// app.put("/articles/:title", (req, res) => {
//   console.log("\nreq.body @ articles PUT:\n", req.body);
//   console.log("req.params:", req.params);
//   const { title } = req.params;
//   let articleToEdit = DB_Articles.getArticleByTitle(title);
//   console.log("\narticleToEdit:\n", articleToEdit);
//   if (req.body.title === "" || req.body.body === "" || req.body.author === "") {
//     res.render("edit", { articleToEdit });
//   }
//   else {
//     if (req.body.title !== articleToEdit.title) {
//       articleToEdit.title = req.body.title;
//     }
//     if (req.body.body !== articleToEdit.body) {
//       articleToEdit.body = req.body.body;
//     }
//     if (req.body.author !== articleToEdit.author) {
//       articleToEdit.author = req.body.author;
//     }
//     res.redirect(`/articles/${articleToEdit.title}`);
//   }

// });

// //DELETE '/articles/:title'
// app.delete("/articles/:title", (req, res) => {
//   console.log("\nThis is DELETE for articles.");
//   console.log("req.params:", req.params);
//   const { title } = req.params;
//   //Find the article in storage and remove it
//   let deletedArticle = DB_Articles.removeArticleByTitle(title);
//   console.log("\nCheck deletedArticle:", deletedArticle);
//   console.log("\nCheck remaining articles:\n", DB_Articles.all());
//   res.redirect('/articles');
// });

app.listen(PORT, () => {
  console.log(`Started app on port: ${PORT}`);
});