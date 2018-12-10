const Sequelize = require('sequelize')
const conn = require('../connection')

const Categories = conn.define('categories', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 30],
        msg: 'Must be between three to thirty characters.'
      }
    }
  }
})

module.exports = Categories
