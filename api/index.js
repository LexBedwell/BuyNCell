const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')

const {models} = require('../db')

router.use(async (req, res, next) => {
  try {
    const token = req.headers.authorization
    let decodedToken = jwt.decode(token, process.env.JWT_SECRET)
    let id = decodedToken.id
    req.user = await models.Users.findByPk(id)
    next()
  } catch (err) {
    console.log("Token authentication failed: ", err.message)
    next()
  }
})

router.use('/auth', require('./routes/auth'))
router.use('/categories', require('./routes/categories'))
router.use('/orders', require('./routes/orders'))
router.use('/products', require('./routes/products'))

module.exports = router
