const express = require('express')
const router = express.Router()
const axios = require('axios')
const jwt = require('jwt-simple')

const {models} = require('../../db')

//testing purposes only!
router.get('/users', async (req, res, next) => {
    let response = await models.Users.findAll({})
    res.send(response)
})

router.get('/', async (req, res, next) => {
  try {
    const token = req.headers.authorization
    let decodedToken = jwt.decode(token, process.env.JWT_SECRET)
    let id = decodedToken.id
    let user = await models.Users.findByPk(id)
    if (!user){
      throw new Error('Bad authentication token.')
    }
    res.send({id: user.id, email: user.email})
  } catch (err) {
    console.log('Unable to authenticate user token: ', err.message)
    res.send({})
    //next(err)
  }
})

//Get Facebook Code
router.get('/facebook', async (req, res, next) => {
  const url = `https://www.facebook.com/v3.2/dialog/oauth?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&state=${process.env.FACEBOOK_STATE}&scope=email`
  res.redirect(url)
})

//Exchange Facebook Code for Access Tokens and Facebook Email, send user token for our site
router.get('/facebook/callback', async (req, res, next) => {
  try {
    let response = await axios.get(`https://graph.facebook.com/v3.2/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&client_secret=${process.env.FACEBOOK_SECRET}&code=${req.query.code}`)
    let accessToken = response.data.access_token
    response = await axios.get(`https://graph.facebook.com/me?fields=email&access_token=${accessToken}`)
    let facebookData = response.data
    let user = await models.Users.findOne({
      where: {
          email: facebookData.email
      }
    })
    if (!user){
      if (facebookData.email){
        user = await models.Users.create({
        email: facebookData.email,
        isAdmin: false
      })
    } else {
      return next(new Error('Facebook User Validation Failed.'))
    }
    }
    const token = jwt.encode({id: user.id}, process.env.JWT_SECRET)
    res.redirect(`/?token=${token}`)
  } catch (err) {
    console.log('Facebook authentication failed: ', err.message)
    next(err)
  }
})

module.exports = router

//GITHUT OAuth
/*
router.get('/github', (req, res, next) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`
  res.redirect(url)
})

router.get('/github/callback', async (req, res, next) => {
  try {
      let response = await axios.post('https://github.com/login/oauth/access_token', {
          code: req.query.code,
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          redirect_uri: process.env.GITHUB_REDIRECT_URI
      })
      const parsed = queryString.parse(response.data)
      if (parsed.error){
          throw new Error('Github authentication failed.')
      }
      response = await axios.get(`https://api.github.com/user?access_token=${parsed.access_token}`)
      const {login} = response.data
      let user = await models.Users.findOrCreate({
          where: {
            githubUserId: login
        }
      })
      user = user[0].dataValues
      const token = jwt.encode({ id: user.id}, process.env.JWT_SECRET)
      res.redirect(`/?token=${token}`)
  } catch (err){
      next(err)
  }
})
*/

