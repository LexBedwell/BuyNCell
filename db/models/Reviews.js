const Sequelize = require('sequelize')
const conn = require('../connection')

const Reviews = conn.define('reviews', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [10, 1000],
        msg: 'Must be between ten to one thousand characters.'
      }
    },
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports = Reviews
