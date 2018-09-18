//Route object that we can route our objects into
const express = require('express');
const Router = express.Router();
const knex = require('../knex/knex.js');

//Hardcoded database for articles
const Articles = require('../db/articles.js');
const DB_Articles = new Articles();

//Error flag for adding an article
let addingArticleError = false;

////////////////////////////////////////////////////////////////////////
//Article routes below will output HTML generated from our TEMPLATES //
////////////////////////////////////////////////////////////////////////

//GET '/articles/new'
Router.get("/articles/new", (req, res) => {
  console.log("\nThis is GET /articles/new - new.hbs");
  const addingArticle = true;
  res.render("new", { addingArticle });
});

//GET '/articles/:title/edit'
Router.get("/articles/:title/edit", (req, res) => {
  console.log("\nThis is GET articles - edit");
  //console.log("req.params:", req.params);
  const { title } = req.params;
  console.log("Title for edit:", title);
  DB_Articles.getArticleByTitle(title)
    .then(results => {
      const editArticleItem = results.rows[0];
      console.log("editArticleItem:", editArticleItem);
      res.render("edit", { editArticleItem });
    })
    .catch(err => {
      console.log("EDIT article error:", err);
    });
});

//GET '/articles/:title'
Router.get("/articles/:title", (req, res) => {
  console.log("\nThis is GET /articles/:title - articles.hbs");
  const { title } = req.params;
  console.log("title:", title);

  DB_Articles.getArticleByTitle(title)
    .then(results => {
      const selectedArticleItem = results.rows[0];
      console.log("selectedArticleItem:\n", selectedArticleItem);
      res.render("article", selectedArticleItem);
    })
    .catch(err => {
      console.log("GET ERROR:", err);
    })
});

//GET '/articles'; displays all Articles added thus far
Router.get("/articles", (req, res) => {
  console.log("\nThis is GET /articles - index.hbs");

  DB_Articles.all()
    .then(results => {
      const articleItems = results.rows;
      res.render('index', { articleItems });
    })
    .catch(err => {
      console.log('ERROR:', err);
    })
});

//////////////////
//Article Routes//
//////////////////

//POST '/articles'
Router.post("/articles", (req, res) => {
  console.log("\nreq.body:\n", req.body);
  if (req.body.title !== "" && req.body.body !== "" && req.body.author !== "") {
    const newArticleItem = req.body;
    DB_Articles.add(newArticleItem)
      .then(() => {
        res.redirect("/articles");
      })
      .catch(err => {
        console.log("POST article error:", err);
      })
  }
  else {
    addingArticleError = true;
    res.render("new", { addingArticleError });
  }
});

//PUT '/articles/:title'
Router.put("/articles/:title", (req, res) => {
  console.log("\nreq.body @ articles PUT:\n", req.body);
  console.log("req.params:", req.params);
  const { title } = req.params;
  if (req.body.title === "" || req.body.body === "" || req.body.author === "") {
    console.log("I'm here1");
    DB_Articles.getArticleByTitle(title)
      .then(results => {
        let articleToEdit = results.rows[0];
        console.log("articleToEdit:", articleToEdit);
        res.render("edit", { articleToEdit });
      })
      .catch(err => {
        console.log("PUT articles error1:", err);
      });
  }
  else {
    console.log("I'm here2");
    DB_Articles.updateArticle(title, req.body)
      .then(() => {
        res.redirect(`/articles/${req.body.title}`);
      })
      .catch(err => {
        console.log("PUT article error2:", err);
      });
  }

});

//DELETE '/articles/:title'
Router.delete("/articles/:title", (req, res) => {
  console.log("\nThis is DELETE for articles.");
  console.log("req.params:", req.params);
  const { title } = req.params;
  //Find the article in storage and remove it
  let deletedArticle = DB_Articles.removeArticleByTitle(title);
  console.log("\nCheck deletedArticle:", deletedArticle);
  console.log("\nCheck remaining articles:\n", DB_Articles.all());
  res.redirect('/articles');
});

module.exports = Router;