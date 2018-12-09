const Sequelize = require('sequelize')
const conn = require('../connection')

const Categories = conn.define('categories', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 30],
        msg: 'Minimum of three characters required.'
      }
    }
  }
})

module.exports = Categories
