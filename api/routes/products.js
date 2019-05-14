const express = require('express')
const router = express.Router()

const {models} = require('../../db/')

router.get('/:id', (req, res, next) => {
  models.Products.findByPk(req.params.id)
    .then((response) => res.send(response))
    .catch(next)
})

module.exports = router
