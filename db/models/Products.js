const Sequelize = require('sequelize')
const conn = require('../connection')

const Products = conn.define('products', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 30],
        msg: 'Minimum of three characters required.'
      }
    }
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [4, 40],
        msg: 'Minimum of four characters required.'
      }
    }
  },
  price: {
    type: Sequelize.FLOAT,
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
