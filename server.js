const express = require('express');
const app = express();
const PORT = process.env.PORT || 8002;
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

//Tells Express to use a static directory that we define as the location to look for requests
app.use(express.static("public"));

//For parsing application/x-www-form-urlencoded. 'extended = true' means the object's key-value pairs' value can be any type, not just string or array. It replaces the code needed to parse the buffer for request body and returns the already parsed information/object as "req.body".
app.use(bodyParser.urlencoded({ extended: true }));

//Creates a super simple Express app; basic way to register a Handlebars view engine
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

app.get("/", (req, res) => {
  res.render("home");
})



app.listen(PORT, () => {
  console.log(`Started app on port: ${PORT}`);
});