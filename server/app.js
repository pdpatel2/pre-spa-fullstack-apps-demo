const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const html = require("html-template-tag");

//logging middleware
app.use(morgan("dev"));

//serving up static files (e.g. css files)
app.use(express.static(path.join(__dirname, "../public")));

//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res, next) => {
//VIEW
  const basicView = () => html`<!DOCTYPE html>
    <html>
      <head>
        <title>Pizza World</title>
        <link href="style.css" rel="stylesheet">
      </head>
      <body>
        <h1>Pizza World</h1>
        <h3>Welcome to Pizza World!</h3>
        <div><a href='/pizzas'>SEE ALL PIZZAS</a></div>
        <div><a href='/toppings'>SEE ALL TOPPINGS</a></div>
        <div><a href='/pizzas/new'>CREATE NEW PIZZA</a></div>
      </body>
  </html>`

  //SENDING VIEW
  res.send(basicView())
})

app.use('/pizzas', require('./routes/pizzas'))
app.use('/toppings', require('./routes/toppings'))

app.use((req, res, next) => {
  res.status(404).send('<h1>Page does not exist</h1>');
});

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send('custom error');
});


module.exports = app;
