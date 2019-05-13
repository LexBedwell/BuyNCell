const Sequelize = require('sequelize')
module.exports = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_db', {logging: false})
