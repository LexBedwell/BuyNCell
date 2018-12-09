const Sequelize = require('sequelize')
const conn = require('../connection')

const LineItems = conn.define('lineItems', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
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
