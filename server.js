const express = require('express')
const app = express()

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

module.exports =  { app }
