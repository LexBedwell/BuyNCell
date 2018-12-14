const express = require('express')
const app = express()

const {syncAndSeed} = require('./db')

try {
  Object.assign(process.env, require('./.env'))
} catch (err){
  console.log(err)
}

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('./client/public'))

app.use('/api', require('./api'))

app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message })
})

app.listen(PORT, () => {
  console.log('Now listening on', PORT)
})

syncAndSeed()
