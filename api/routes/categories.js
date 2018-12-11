const express = require('express')
const router = express.Router()

const {models} = require('../../db/')

router.get('/', (req, res, next) => {
  models.Categories.findAll({order: ['id']})
    .then((response) => res.send(response))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  models.Categories.findOne({where: {id: req.params.id}, include: [models.Products]})
    .then((response) => res.send(response))
    .catch(next)
})

module.exports = router
