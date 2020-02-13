const Sequelize = require("sequelize");

const db = new Sequelize("postgres://localhost:5432/pizzaworld", {
  logging: false
});

const Pizza = db.define('pizza', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  crust: {
    type: Sequelize.ENUM('thin', 'pan', 'deep dish'),
    defaultValue: 'pan'
  }
});

const Topping = db.define('topping', {
  name: {
    type: Sequelize.STRING,
    defaultValue: 'cheese'
  }
})

Pizza.belongsToMany(Topping, {through: 'pizza-toppings'})
Topping.belongsToMany(Pizza, {through: 'pizza-toppings'})

module.exports = {
  db,
  Pizza,
  Topping
};
