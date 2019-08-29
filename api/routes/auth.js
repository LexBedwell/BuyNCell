const express = require('express')
const router = express.Router()
const axios = require('axios')
const jwt = require('jwt-simple')

const {findUser, findOrCreateUser} = require('../../utils/services/accountService.js')

router.get('/', async (req, res, next) => {
  try {
    const token = req.headers.authorization
    let decodedToken = jwt.decode(token, process.env.JWT_SECRET)
    let id = decodedToken.id
    let user = await findUser(id)
    if (!user){
      throw new Error('Bad authentication token.')
    }
    res.send({id: user.id, email: user.email})
  } catch (err) {
    console.error('Unable to authenticate user token: ', err.message)
    res.send({})
  }
})

router.get('/facebook', async (req, res, next) => {
  const url = `https://www.facebook.com/v3.2/dialog/oauth?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&state=${process.env.FACEBOOK_STATE}&scope=email`
  res.redirect(url)
})

router.get('/facebook/callback', async (req, res, next) => {
  try {
    let response = await axios.get(`https://graph.facebook.com/v3.2/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&client_secret=${process.env.FACEBOOK_SECRET}&code=${req.query.code}`)
    let accessToken = response.data.access_token
    response = await axios.get(`https://graph.facebook.com/me?fields=email&access_token=${accessToken}`)
    let facebookData = response.data
    let user = await findOrCreateUser(facebookData.email)
    if (!user || user.error){
      return next(new Error('Facebook User Validation Failed.'))
    }
    const token = jwt.encode({id: user.id}, process.env.JWT_SECRET)
    res.redirect(`/?token=${token}`)
  } catch (err) {
    console.error('Facebook authentication failed: ', err.message)
    next(err)
  }
})

module.exports = router
