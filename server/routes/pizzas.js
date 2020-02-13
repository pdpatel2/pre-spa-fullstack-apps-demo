const router = require('express').Router()
const {Pizza, Topping} = require('../db')
const html = require("html-template-tag");

router.get('/', async (req, res, next) => {
  try {
    //DATA
    const pizzas = await Pizza.findAll()

    //VIEW
    const allPizzaView = (pizzas) => html`<!DOCTYPE html>
      <html>
        <head>
          <title>Pizza World</title>
          <link href="style.css" rel="stylesheet" />
        </head>
        <body>
          <h1>Pizza World</h1>
          <h3>List of pizzas:</h3>
          ${pizzas.map(pizza => html`
            <div>
              <a href='/pizzas/${pizza.id}'>${pizza.name}</a>
            </div>`
          )}
        </body>
    </html>`

    //SENDING VIEW
    res.send(allPizzaView(pizzas))
  } catch(err) {
    next(err)
  }
})

router.get('/new', (req, res, next) => {
  //SENDING VIEW
  res.send(
    `<html>
      <head>
        <title>Pizza World</title>
        <link href="http://localhost:3000/style.css" rel="stylesheet" />
      </head>
      <body>
        <h1>Pizza World</h1>
        <h3>Add a Pizza</h3>
        <form method="POST" action="/pizzas">
          <div class="form-group">
            <label for="pizza">Pizza</label>
            <input id="pizza" name="name" type="text"/>
          </div>
          <button type="submit">submit</button>
        </form>
      </body>
    </html>`
  )
})

router.get('/:pizzaId', async (req, res, next) => {
  try {
    // DATA
    const pizza = await Pizza.findByPk(req.params.pizzaId, {
      include: Topping
    })

    //VIEW
    const singlePizzaView = (pizza) => html`<!DOCTYPE html>
      <html>
        <head>
          <title>Pizza World</title>
          <link href="http://localhost:3000/style.css" rel="stylesheet" />
        </head>
        <body>
          <h1>Pizza World</h1>
          <h3>List of toppings for ${pizza.name} pizza:</h3>
          <ul>
          ${pizza.toppings.map(topping => html`
            <li>${topping.name}</li>`
          )}
          </ul>
        </body>
      </html>`

    //SENDING VIEW
    res.send(singlePizzaView(pizza))
  } catch(err) {
    next(err)
  }
})

router.post('/', async(req, res, next) => {
  try {
    await Pizza.create(req.body)
    res.redirect('/pizzas')
  } catch(err) {
    next(err)
  }
})

module.exports = router
