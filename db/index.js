const conn = require('./connection')

const Products = require('./models/Products')
const Categories = require('./models/Categories')

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
    Products, Categories
  }, syncAndSeed
}
