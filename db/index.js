const conn = require('./connection')

const categories = require('./seed/categories')
const products = require('./seed/products')
const users = require('./seed/users')

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
Products.belongsToMany(Categories, { through: 'productscategories' })
Categories.belongsToMany(Products, { through: 'productscategories' })

const syncAndSeed = async () => {
  try {
    await conn.sync({force: true})
    const [cel, chopCel, mincCel, preCel, preChopCel, preMincCel] = await Promise.all(products.map( product => Products.create(product)))
    const [reg, pre] = await Promise.all(categories.map( category => Categories.create(category)))
    const regProducts = [cel, chopCel, mincCel]
    const preProducts = [preCel, preChopCel, preMincCel]
    await regProducts.forEach( product => product.addCategories(reg))
    await preProducts.forEach( product => product.addCategories(pre))
    const sampleUsers = await Promise.all(users.map( user => Users.create(user)))
    const sampleOrders = await Promise.all(sampleUsers.map( user => Orders.create({userId: user.id, addressName: user.addressName, addressLine: user.addressLine, addressCity: user.addressCity, addressState: user.addressState, addressZip: user.addressZip})))
    //regProducts.concat(preProducts).forEach( product => LineItems.create({productId: product.id, orderId: sampleOrders[0].id}))
    await Promise.all(regProducts.concat(preProducts).map( product => LineItems.create({productId: product.id, orderId: sampleOrders[0].id})))
    console.log('Databse syncAndSeed completed.')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  models: {
    Categories, Images, LineItems, Orders, Products, Reviews, Users
  }, syncAndSeed
}
