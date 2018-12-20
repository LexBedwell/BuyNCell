const Sequelize = require('sequelize')
const conn = require('../connection')

const Products = conn.define('products', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 30],
        msg: 'Must be between three to thirty characters.'
      }
    }
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [4, 40],
        msg: 'Must be between four to forty characters.'
      }
    }
  },
  price: {
    type: Sequelize.NUMERIC(12, 2),
    allowNull: false,
    validate: {
      isFloat: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true
    }
  },
  photo: {
    type: Sequelize.TEXT
  }
})

module.exports = Products
