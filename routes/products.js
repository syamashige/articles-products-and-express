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
            const products = results.rows[(id)-1];
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

// GET - Product By ID Edit Form 
router.get('/products/:id/edit', (req, res) => {
    const { id } = req.params;
    knex.raw(`SELECT * FROM products WHERE id =  ${id}`)
        .then(results => {
            const thisProduct = results.rows[0];
            res.render('edit', {thisProduct})
        })
        .catch(err => {
            console.log('error', err);
        })
});

router.put('/products/:id', (req, res) => {
    const { id } = req.params;
    knex.raw(`SELECT * FROM products WHERE id = ${id}`)
        .then(results => {
            let editThisProduct = results.rows[0];
            console.log('editThisProduct', editThisProduct);
            if (req.body.name !== editThisProduct.name) {
                console.log('Product name does not match');
                editThisProduct.name = req.body.name;
                console.log('Editing product name to:', editThisProduct.name);
            }
            if (req.body.price !== editThisProduct.price) {
                console.log('Product price does not match');
                editThisProduct.price = req.body.price;
                console.log('Editing product price to:', editThisProduct.price);
            }
            if (req.body.inventory !== editThisProduct.inventory) {
                console.log('Product inventory does not match');
                editThisProduct.inventory = req.body.inventory;
                console.log('Editing product inventory to:', editThisProduct.inventory);
            }
            if (req.body.description !== editThisProduct.description) {
                console.log('Product description does not match');
                editThisProduct.description = req.body.description;
                console.log('Editing product description to:', editThisProduct.description);
            }
            console.log('Product has been edited');
            console.log('Should be updated', editThisProduct);
            res.redirect(`/products/${id}`);
        })
        .catch(err => {
            console.log('error updating product', err);
        })
});


// DELETE - Delete A Product 

module.exports = router;