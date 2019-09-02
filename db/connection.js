const Sequelize = require('sequelize')
module.exports = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/celery_store_db', {logging: false})
