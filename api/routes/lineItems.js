const express = require('express')
const router = express.Router()

const {models} = require('../../db/')

router.put('/', async (req, res, next) => {
  try {
    await req.body.newCart.lineItems.forEach(lineItem => {
      models.LineItems.update({
        quantity: lineItem.quantity
      }, {
        where: {
            id: lineItem.id
        }
      })
    })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

module.exports = router
