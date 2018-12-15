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
    res.send({})
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
    console.log('*******Cart error: ', err.message)
    next(err)
  }
})

module.exports = router
