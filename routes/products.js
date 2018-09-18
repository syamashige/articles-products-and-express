const express = require('express');
const router = express.Router();
const knex = require('../knex/knex.js');

// GET - Products Page
router.get('/products', (req, res) => {
    console.log("Hello?")
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
});

//GET - Create New Products Form
router.get('/products/new', (req, res) => {
    console.log('Products Form')
    res.render('form');
});

// GET Products by Id
router.get('/products/:id', (req, res) => {
    const { id } = req.params;
    console.log('Product ID', id);
    console.log('Hitting Get Products by ID')
    knex.raw(`SELECT * FROM products`)
        .then(results => {
            // console.log('product by id', results);
            const products = results.rows[(id-1)];
            res.render('detail', { products });
        })
        .catch(err => {
            console.log('error getting product by id', err);
        })
})


// POST - New Products 
router.post('/products/new', (req, res) => {
    console.log('New Product')
    const { prodName, prodPrice, prodInventory, prodDescription } = req.body;

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
router.get('/products/:id/edit', (req, res) => {
    const { id } = req.params;
    knex.raw(`SELECT * FROM products WHERE id =  ${id}`)
        .then(results => {
            const editThisProduct = results.rows[0];
            res.render('edit', {editThisProduct})
        })
        .catch(err => {
            console.log('error', err);
        })
});


// DELETE - Delete A Product 

module.exports = router;