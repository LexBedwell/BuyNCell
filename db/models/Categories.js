const Sequelize = require('sequelize')
const conn = require('../connection')

const Categories = conn.define('categories', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Categories
