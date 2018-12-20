const express = require('express')
const router = express.Router()

const {Op} = require('sequelize')

const {models} = require('../../db/')

router.get('/', (req, res, next) => {
  models.Orders.findAll({
    include: [{model: models.LineItems, include: models.Products }],
    order: [['createdAt', 'DESC']]
  })
    .then( response => res.send(response))
})

router.get('/history', (req, res, next) => {
  const attr = {
    userId: req.user.id,
    status: {
      [Op.or]: ['processing', 'cancelled', 'completed', 'delivered']
    }
  }
  models.Orders.findAll({
    where: attr,
    include: [{model: models.LineItems, include: models.Products }],
    order: [['createdAt', 'DESC']]
  })
    .then( response => res.send(response))
})

router.get('/cart', async (req, res, next) => {
  if (!req.user){
    const cart = await models.Orders.create({})
    const sentCart = await models.Orders.findOne({ where: {id: cart.id}, include: [{model: models.LineItems, include: models.Products }] })
    res.send(sentCart)
    return
  }
  const attr = {
    userId: req.user.id,
    status: 'cart'
  }
  try {
    let cart = await models.Orders.findOne({ where: attr, include: [{model: models.LineItems, include: models.Products }] })
    if (!cart){
      const createdCart = await models.Orders.create({userId: req.user.id, status: 'cart', addressName: req.user.addressName, addressLine: req.user.addressLine, addressCity: req.user.addressCity, addressState: req.user.addressState, addressZip: req.user.addressZip})
      cart = await models.Orders.findOne({ where: {id: createdCart.id}, include: [{model: models.LineItems, include: models.Products }] })
    }
  res.send(cart);
  }
  catch (err){
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    req.body.lineItems.forEach(async lineItem => {
      await models.LineItems.update({
        quantity: lineItem.quantity
      }, {
        where: {
            id: lineItem.id
        }
      })
    })
    const editedCart = await models.Orders.findOne({ where: {id: req.body.id}, include: [{model: models.LineItems, include: models.Products }] })
    res.send(editedCart)
  } catch (err) {
    next(err)
  }
})

router.put('/submit', async (req, res, next) => {
  try {
    req.body.lineItems.forEach(async lineItem => {
      await models.LineItems.update({
        quantity: lineItem.quantity
      }, {
        where: {
            id: lineItem.id
        }
      })
    })
    await models.Orders.update({
        status: 'processing',
        isPaid: true,
        addressName: req.body.addressName,
        addressLine: req.body.addressLine,
        addressCity: req.body.addressCity,
        addressState: req.body.addressState,
        addressZip: req.body.addressZip
      }, {
      where: {
        id: req.body.id
      }
    })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

module.exports = router
