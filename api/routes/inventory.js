const express = require('express')
const router = express.Router()

const { checkInstock } = require('../../utils/services/inventoryService.js')

router.get('/:id', (req, res, next) => {
  checkInstock(req.params.id)
    .then( response => res.send(response))
    .catch(next)
})

module.exports = router
