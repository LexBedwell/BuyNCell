const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/:id', (req, res, next) => {
  axios.get( (process.env.INVENTORY_SERVICE_URL || 'https://celery-store-inventory-service.herokuapp.com') + '/inventory/' + req.params.id )
    .then( response => {
      if (response.data.error) { 
        res.send({isInStock: response.data.error})
      } else {
        res.send({isInStock: response.data[req.params.id] || false})
      }
    })
    .catch( err => next(err) )
})

module.exports = router
