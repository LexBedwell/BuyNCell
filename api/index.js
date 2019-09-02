const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')

const {findUser} = require('../utils/services/accountService.js')

router.use(async (req, res, next) => {
  try {
    const token = req.headers.authorization
    let decodedToken = jwt.decode(token, process.env.JWT_SECRET)
    let id = decodedToken.id
    req.user = await findUser(id)
    next()
  } catch (err) {
    next()
  }
})

router.use('/auth', require('./routes/auth'))
router.use('/categories', require('./routes/categories'))
router.use('/inventory', require('./routes/inventory'))
router.use('/lineitems', require('./routes/lineItems'))
router.use('/orders', require('./routes/orders'))
router.use('/products', require('./routes/products'))
router.use('/ping', require('./routes/ping'))

module.exports = router
