const express = require('express');
const router = express.Router();
const knex = require('../knex/knex.js');



// GET - Products Page
router.get('/', (req, res) => {
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
router.get('/new', (req, res) => {
    console.log('Products Form')
    res.render('form');
});

// GET Products by Id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log('Product ID', id);
    console.log('Hitting Get Products by ID')
    knex.raw(`SELECT * FROM products`)
        .then(results => {
            // console.log('product by id', results);
            const products = results.rows[(id) - 1];
            res.render('detail', { products });
        })
        .catch(err => {
            console.log('error getting product by id', err);
        })
});

// POST - New Products 
router.post('/new', (req, res) => {
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
router.get('/:id/edit', (req, res) => {
    const { id } = req.params;
    knex.raw(`SELECT * FROM products WHERE id =  ${id}`)
        .then(results => {
            let thisProduct = results.rows[0];
            res.render('edit', {thisProduct})
        })
        .catch(err => {
            console.log('error', err);
        })
});

// PUT - Edit Products by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    // let { name, price, inventory, description } = req.body;
    console.log('editing product id', id);
    console.log('editing product req.body', req.body)
    // knex.raw(`SELECT * FROM products WHERE id = ${id}, UPDATE products SET name = '${req.body.name}', price = '${req.body.price}', inventory = '${req.body.inventory}', description = '${req.body.description}'`)
    // knex.raw(`UPDATE products SET name = '${req.body.name}', price = '${req.body.price}', inventory = '${req.body.inventory}e', description = '${req.body.description}'`)
    knex('products').where({ id: id }).update({
        name: req.body.name,
        price: req.body.price,
        inventory: req.body.inventory,
        description: req.body.description
    })
        .then(results => {
            // let editThisProduct = results.rows[(id)-1];
            // res.render('detail', { editThisProduct });
            res.redirect(`/products/${id}`)
        })
        .catch(err => {
            console.log('error updating product', err);
        })
}); 

// DELETE - Delete A Product 
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log('Deleting item at', id);
    knex.raw(`DELETE FROM products WHERE id = ${id}`)
        .then(results => {
            res.redirect('/products');
        })
        .catch(err => {
            console.log('Error in Deleting', err);
        })
});

module.exports = router;