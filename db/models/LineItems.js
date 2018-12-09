const Sequelize = require('sequelize')
const conn = require('../connection')

const LineItems = conn.define('lineItems', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
    validate: {
      isInt: true
    }
  },
  salePrice: {
    type: Sequelize.FLOAT,
    validate: {
      isFloat: true
    }
  }
});

module.exports = LineItems
