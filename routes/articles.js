// GET - Articles Page
app.get('/articles', (req, res) => {
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
app.get('/articles/new', (req, res) => {
    res.render('artForm')
})

// POST - New Articles 
app.post('/articles/new', (req, res) => {
    const { title, author, body } = req.body;
    console.log('req.body', req.body);
    console.log('title', title);

    knex.raw(`INSERT INTO articles (title, author, body) VALUES ('${req.body.title}', '${req.body.author}','${req.body.body}')`)
        .then(results => {
            console.log('insert articles', results);
            res.redirect('/articles');
        })
        .catch(err => {
            console.log('error', err);
        })
});

// GET - Get Articles by Title
app.get('/articles/:title', (req, res) => {
    console.log('get articles by title', req.params);
    
    knex.raw(`SELECT * FROM articles`)
        .then(results => {
            const { title } = req.params;
            // const { title } = req.body;
            console.log('articles by id', title);
            const articles = results.rows;
            console.log('results.rows[title]', results.rows[title]);
            res.render('artDetail', { articles });
        })
        .catch(err => {
            console.log('error getting articles by title', err);
    })
})