const {db, Pizza, Topping} = require('./server/db')

const pizzaData = [
  {name: 'cheese', crust: 'deep dish'},
  {name: 'veggie lover', crust: 'thin'},
  {name: 'meat lover', crust: 'pan'}
]

const toppingData = [
  {name: 'cheese'},
  {name: 'onions'},
  {name: 'green peppers'},
  {name: 'mushrooms'},
  {name: 'spinach'},
  {name: 'garlic'},
  {name: 'pineapple'},
  {name: 'pepperoni'},
  {name: 'sausage'}
]

const seed = async () => {
  try {
    await db.sync({force: true})
    console.log('database synced for seeding')

    const insertedPizzas = await Pizza.bulkCreate(pizzaData, { returning: true })
    const insertedToppings = await Topping.bulkCreate(toppingData, { returning: true })

    const [cheesePizza, veggiePizza, meatPizza] = insertedPizzas
    const [cheese, onions, peppers, mushrooms, spinach, garlic, pineapple, pepperoni, sausage] = insertedToppings

    await Promise.all([
      cheesePizza.setToppings([cheese]),
      veggiePizza.setToppings([onions, peppers, mushrooms, spinach, garlic]),
      meatPizza.setToppings([pepperoni, sausage])
    ])

    console.log('successfully seeded')

  } catch(err) {
    console.log('problem seeding')
    console.log(err)
  } finally {
    console.log('closing db connection')
    db.close()
  }
}

seed()
