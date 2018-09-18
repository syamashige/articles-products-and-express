//Route object that we can route our objects into
const express = require('express');
const Router = express.Router();
const knex = require('../knex/knex.js');

//Hardcoded database for products
const Products = require('../db/products.js');
const DB_Products = new Products();

//Error flag for adding a product
let addingProductError = false;

////////////////////////////////////////////////////////////////////////
//Product routes below will output HTML generated from TEMPLATE ENGINE//
////////////////////////////////////////////////////////////////////////

//GET '/products/new'; creates a new product
Router.get("/products/new", (req, res) => {
  console.log("\nThis is GET /products/new - new.hbs");
  const addingProduct = true;
  res.render("new", { addingProduct });
});

//GET '/products/:id/edit'; user can update information for a product
Router.get("/products/:id/edit", (req, res) => {
  console.log("\nThis is GET products - edit");
  const { id } = req.params;
  console.log("ID for edit:", id);
  DB_Products.getProductById(id)
    .then(results => {
      const editProductItem = results.rows[0];
      console.log("editProductItem:", editProductItem);
      res.render("edit", { editProductItem });
    })
    .catch(err => {
      console.log("Edit error:", err);
    });

});

//GET '/products/:id'; displays the selected product's info with the corresponding ID
Router.get("/products/:id", (req, res) => {
  console.log("\nThis is GET /products/:id - product.hbs");
  // console.log("req.params:\n", req.params);
  const { id } = req.params;
  console.log("id:", id);

  DB_Products.getProductById(id)
    .then(results => {
      let selectedProductItem = results.rows[0];
      console.log("selectedProductItem:", results.rows[0]);
      res.render("product", selectedProductItem);
    })
    .catch(err => {
      console.log("GET ERROR:", err);
    });
});

//GET '/products'; displays all Products added thus far
Router.get("/products", (req, res) => {
  console.log("\nThis is GET /products - index.hbs");
  DB_Products.all()
    .then(results => {
      //console.log("WHAT IS THIS:", results);
      const productItems = results.rows;
      console.log("productItems:\n ", productItems);
      res.render('index', { productItems });
    })
    .catch(err => {
      console.log('ERROR:', err);
    });

});

//////////////////
//Product Routes//
//////////////////

//POST '/products'
Router.post("/products", (req, res) => {
  console.log("\nreq.body:\n", req.body);
  if (req.body.name !== "" && req.body.price !== "" && req.body.inventory !== "") {
    addingError = false;
    req.body.price = Number(req.body.price);
    req.body.inventory = Number(req.body.inventory);
    const newProductItem = req.body;
    DB_Products.add(newProductItem)
      .then(() => {
        res.redirect("/products");
      })
      .catch(err => {
        console.log("POST product error:", err);
      })
  }
  else {
    addingProductError = true;
    res.render("new", { addingProductError });
  }

});

//PUT '/products/:id'
Router.put("/products/:id", (req, res) => {
  console.log("\nreq.body @ products PUT:\n", req.body);
  console.log("req.params:", req.params);
  const { id } = req.params;
  if (req.body.name === "" || req.body.price === "" || req.body.inventory === "") {
    console.log("I'm here1");
    DB_Products.getProductById(id)
      .then(results => {
        let productToEdit = results.rows[0];
        console.log("productToEdit:", productToEdit);
        res.render("edit", { productToEdit });
      })
      .catch(err => {
        console.log("PUT products error1:", err);
      });
  }
  else {
    console.log("I'm here2");
    DB_Products.updateProduct(id, req.body)
      .then(() => {
        res.redirect(`/products/${id}`);
      })
      .catch(err => {
        console.log("PUT product error2:", err);
      });
  }
});

//DELETE '/products/:id'
Router.delete("/products/:id", (req, res) => {
  console.log("\nThis is DELETE for products.");
  console.log("req.params:", req.params);
  const { id } = req.params;
  //Find the product in storage and remove it
  let deletedProduct = DB_Products.removeProductById(id);
  console.log("\nCheck deletedProduct:", deletedProduct);
  console.log("\nCheck remaining products:\n", DB_Products.all());

  res.redirect('/products');
});

module.exports = Router;