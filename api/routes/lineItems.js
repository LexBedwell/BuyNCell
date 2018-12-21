const express = require('express')
const router = express.Router()

const {models} = require('../../db/')

router.put('/', (req, res, next) => {
  const {cartId, productId, quantity} = req.body
  models.LineItems.create({productId: productId, orderId: cartId, quantity: quantity})
    .then( newLine => models.LineItems.findOne({ where: {id: newLine.id}, include: [models.Products]}) )
    .then( sentLine => res.send(sentLine))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  models.LineItems.destroy({
    where: {
      id: req.params.id
    }
  })
  .then( () => res.sendStatus(200))
  .catch(next)
})

module.exports = router
