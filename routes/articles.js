const express = require('express');
const router = express.Router();
const knex = require('../knex/knex.js');

// GET - Articles Page
router.get('/', (req, res) => {
    knex.raw('SELECT * FROM articles')
        .then(results => {
            console.log("IZ GET ARTICLES??");
            console.log('article results', results);
            const articles = results.rows;
            res.render('articles', { articles });
        })
        .catch(err => {
        console.log('error', err)
    })
});

// GET - Create New Articles Form
router.get('/new', (req, res) => {
    res.render('artForm')
})

// POST - New Articles 
router.post('/new', (req, res) => {
    const { title } = req.params;

    knex.raw(`INSERT INTO articles (title, author, body) VALUES ('${req.body.title}', '${req.body.author}','${req.body.body}')`)
        .then(results => {
            res.redirect('/articles');
        })
        .catch(err => {
            console.log('error', err);
        })
});

// GET - Get Articles by Title
router.get('/:title', (req, res) => {
    const { title } = req.params;
    knex.raw(`SELECT * FROM articles WHERE title = '${title}'`)
        .then(results => {
            console.log('Please results!', results)
            console.log('articles title', title);
            const articles = results.rows[0];
            res.render('artDetail', { articles });
        })
        .catch(err => {
            console.log('error getting articles by title', err);
    })
})

module.exports = router;