const express = require('express')
const app = express()
const axios = require('axios')

require('console-info')
require('console-warn')
require('console-error')

const {syncAndSeed} = require('./db')
const PORT = process.env.PORT || 3000

try {
  Object.assign(process.env, require('./.env'))
} catch (err){
  console.error(err.message)
  console.warn('Unable to set env variables. Some functionality may be disabled.')
}

console.info(`Starting server in mode: ${process.env.NODE_ENV || 'Unable to access process.env.NODE_ENV --> defaulting to production'}`)

app.use(express.json({limit: '5mb'}))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./client/public'))

app.use('/api', require('./api'))

app.use((err, req, res, next) => {
  console.error('error: ', err.message)
  res.status(500).send({ error: err.message })
})

app.listen(PORT, () => {
  console.info('Now listening on port', PORT)
})

syncAndSeed()

axios.get(process.env.INVENTORY_SERVICE_URL || 'https://celery-store-inventory-service.herokuapp.com')
  .then( response => {
    if (response.data.response.results === 'pong'){
      console.info('inventory-service is online')
    } else {
      throw new Error('Unable to connect to inventory-service')
    }
  })
  .catch( err => {
    console.error(err.message)
    console.warn('inventory-service is offline. Some functionality may be disabled.')
  })

module.exports =  { app }
