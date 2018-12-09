const express = require('express')
const app = express()

const {syncAndSeed} = require('./db')

const PORT = process.env.PORT || 3000

app.use(express.static('./client/public'))

app.use('/api', require('./api'))

syncAndSeed()

app.listen(PORT, () => {
  console.log('Now listening on', PORT)
})
