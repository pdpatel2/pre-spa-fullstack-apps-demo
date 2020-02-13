const router = require('express').Router()
const {Topping} = require('../db')
const html = require("html-template-tag");

router.get('/', async (req, res, next) => {
  try{
    //DATA
    const toppings = await Topping.findAll()

    //VIEW
    const allToppingView = (toppings) => html`<!DOCTYPE html>
      <html>
        <head>
          <title>Pizza World</title>
          <link href="style.css" rel="stylesheet" />
        </head>
        <body>
          <h1>Pizza World</h1>
          <h3>List of toppings:</h3>
          <ul>
          ${toppings.map(topping => html`
            <li>${topping.name}</li>`
          )}
          </ul>
        </body>
    </html>`

    //SENDING VIEW
    res.send(allToppingView(toppings))
  }
  catch(err) {
    next(err)
  }
})

module.exports = router
