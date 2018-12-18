const express = require('express')
const router = express.Router()

const {models} = require('../../db/')

router.get('/', (req, res, next) => {
  models.Orders.findAll({
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
      cart = await models.Orders.create(attr)
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

module.exports = router
