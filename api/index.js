const express = require('express')
const router = express.Router()

router.use('/categories', require('./routes/categories'))
router.use('/products', require('./routes/products'))

module.exports = router
