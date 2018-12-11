const conn = require('./connection')

const Categories = require('./models/Categories')
const Images = require('./models/Images')
const LineItems = require('./models/LineItems')
const Orders = require('./models/Orders')
const Products = require('./models/Products')
const Reviews = require('./models/Reviews')
const Users = require('./models/Users')

LineItems.belongsTo(Products)
Orders.hasMany(LineItems)
Products.hasMany(Reviews)
Users.hasMany(Reviews)
Users.hasMany(Orders)
Products.belongsToMany(Categories, { through: 'ProductsCategories' })
Categories.belongsToMany(Products, { through: 'ProductsCategories' })

const syncAndSeed = () => {
  conn.sync({force: true})
    .then( () => Products.create({title: 'Regular Celery', description: 'Pretty regular stuff', price: 1.00, quantity: 99}))
    .then( () => Categories.create({name: 'Regular'}))
    .then( () => console.log('sync and seed complete'))
}

module.exports = {
  models: {
    Categories, Images, LineItems, Orders, Products, Reviews, Users
  }, syncAndSeed
}
