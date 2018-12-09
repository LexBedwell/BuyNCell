const Sequelize = require('sequelize')
const conn = require('../connection')

const Products = conn.define('products', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  photo: {
    type: Sequelize.TEXT
  }
})

module.exports = Products
