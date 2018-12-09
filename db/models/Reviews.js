const Sequelize = require('sequelize')
const conn = require('../connection')

const Reviews = conn.define('reviews', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [10, 17000],
        msg: 'Minimum of 10 characters required'
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
