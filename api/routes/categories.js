const express = require('express')
const router = express.Router()

const {models} = require('../../db/')

router.get('/', (req, res, next) => {
  models.Categories.findAll({include: [models.Products], order: ['id']})
    .then((response) => res.send(response))
    .catch(next)
})

module.exports = router
