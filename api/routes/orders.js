const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')

const {Op} = require('sequelize')

const {models} = require('../../db/')

router.get('/', (req, res, next) => {
  models.Orders.findAll({
    include: [{model: models.LineItems, include: models.Products }],
    order: [['createdAt', 'DESC']]
  })
    .then( response => res.send(response))
})

router.get('/history', (req, res, next) => {
  const attr = {
    userId: req.user.id,
    status: {
      [Op.or]: ['processing', 'cancelled', 'completed', 'delivered']
    }
  }
  models.Orders.findAll({
    where: attr,
    include: [{model: models.LineItems, include: models.Products }],
    order: [['createdAt', 'DESC']]
  })
    .then( response => res.send(response))
})

router.get('/cart', async (req, res, next) => {
  if (!req.user){
    const cart = await models.Orders.create({})
    const sentCart = await models.Orders.findOne({ where: {id: cart.id}, include: [{model: models.LineItems, include: models.Products }] })
    res.send(sentCart)
    return
  }
  const attr = {
    userId: req.user.id,
    status: 'cart'
  }
  try {
    let cart = await models.Orders.findOne({ where: attr, include: [{model: models.LineItems, include: models.Products }] })
    if (!cart){
      const createdCart = await models.Orders.create({userId: req.user.id, status: 'cart'})
      cart = await models.Orders.findOne({ where: {id: createdCart.id}, include: [{model: models.LineItems, include: models.Products }] })
    }
  res.send(cart);
  }
  catch (err){
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    req.body.lineItems.forEach(async lineItem => {
      await models.LineItems.update({
        quantity: lineItem.quantity
      }, {
        where: {
            id: lineItem.id
        }
      })
    })
    const editedCart = await models.Orders.findOne({ where: {id: req.body.id}, include: [{model: models.LineItems, include: models.Products }] })
    res.send(editedCart)
  } catch (err) {
    next(err)
  }
})

router.put('/submit', async (req, res, next) => {
  try {
    let orderEmail
    let orderId = req.body.id
    if (!req.body.userId){
      let searchUser = await models.Users.findOrCreate({ where: {email: req.body.email} })
      await models.Orders.update({
        userId: searchUser[0].id
      }, {
        where: {
          id: req.body.id
        }
      })
      orderEmail = req.body.email
    } else {
      let searchUser = await models.Users.findByPk(req.body.userId)
      orderEmail = searchUser.email
    }
    req.body.lineItems.forEach(async lineItem => {
      await models.LineItems.update({
        quantity: lineItem.quantity
      }, {
        where: {
            id: lineItem.id
        }
      })
    })
    await models.Orders.update({
        status: 'processing',
        isPaid: true,
        addressName: req.body.addressName,
        addressLine: req.body.addressLine,
        addressCity: req.body.addressCity,
        addressState: req.body.addressState,
        addressZip: req.body.addressZip
      }, {
      where: {
        id: req.body.id
      }
    })
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
      }
    })
    let mailOptions = {
      from: 'Celery Store',
      to: orderEmail,
      subject: `Thank you for your order from Celery Store!`,
      html: `<html><p>Hello ${orderEmail}!</p>
      <p>Thank you for your order from Celery Store!</p>
      <p>Your order number is ${orderId}.</p>
      <p>Please visit <a href="https://celery-store.herokuapp.com">Celery Store</a> again for all your celery needs!</p>
      <p>**THIS IS A TEST EMAIL SO DON'T WORRY, YOU HAVEN'T BEEN CHARGED!**</p>  
      </html>`
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Message sent to ', orderEmail);
      }
    })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

module.exports = router
