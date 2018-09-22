const express = require('express');
const router = express.Router();
const knex = require('../knex/knex.js');

// winston has to go in your individual route files
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console()
    ]
}); 



// GET - Products Page
router.get('/', (req, res) => {
    console.log("Hello?")
    knex.raw('SELECT * FROM products')  
        .then(results => {
            logger.info('[put message here]');
            const products = results.rows
            res.render('products', { products })
        })
        .catch(err => {
            // console.log('error', err)
            logger.error(er)
        })
});

//GET - Create New Products Form
router.get('/new', (req, res) => {
    res.render('form');
});

// GET Products by Id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    knex.raw(`SELECT * FROM products WHERE id = ${id}`)
    // knex('products').where({id: id})    
        .then(results => {
            const products = results.rows[0];
            // const prodObj = {products: product}
           // console.log('products', product)
            res.render('detail', {products} );
        })
        .catch(err => {
            console.log('error getting product by id', err);
        })
});

// POST - New Products 
router.post('/new', (req, res) => {

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
    // Got a syntax Error: 
    // knex.raw(`SELECT * FROM products WHERE id = ${id} UPDATE products SET name = '${req.body.name}', price = '${req.body.price}', inventory = '${req.body.inventory}', description = '${req.body.description}'`)

    // Updates everything in my products table as the new input
    // knex.raw(`UPDATE products SET name = '${req.body.name}', price = '${req.body.price}', inventory = '${req.body.inventory}e', description = '${req.body.description}'`)

    knex('products').where({ id: id }).update({
        name: req.body.name,
        price: req.body.price,
        inventory: req.body.inventory,
        description: req.body.description
    })
        .then(results => {
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
    knex('products').where({ id: id }).del()
        .then(() => {

            res.redirect('/');
        })
        .catch(err => {
            console.log('error deleting the product', err);
    })
});

module.exports = router;