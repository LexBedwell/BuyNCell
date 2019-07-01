const express = require('express')
const app = express()

const {syncAndSeed} = require('./db')
const PORT = process.env.PORT || 3000

try {
  Object.assign(process.env, require('./.env'))
} catch (err){
  console.log(err)
}

console.log(`Starting server in mode: ${process.env.NODE_ENV || 'Unable to access process.env.NODE_ENV --> defaulting to production'}`)

app.use(express.json({limit: '5mb'}))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./client/public'))

app.use('/api', require('./api'))

app.use((err, req, res, next) => {
  console.log('error: ', err.message)
  res.status(500).send({ error: err.message })
})

app.listen(PORT, () => {
  console.log('Now listening on port', PORT)
})

syncAndSeed()

module.exports =  { app }
