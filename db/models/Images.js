const Sequelize = require('sequelize')
const conn = require('../connection')

const Images = conn.define('images', {
	data: {
		type: Sequelize.TEXT,
		allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Images

