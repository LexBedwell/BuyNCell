const express = require('express')
const router = express.Router()

const {models} = require('../db')

router.get('/', (req, res, next) => {
  res.send('You hit the API!')
})

router.get('/products', (req, res, next) => {
  models.Products.findAll({})
    .then( (products) => res.send(products))
})

module.exports = router
