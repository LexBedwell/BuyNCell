const express = require('express')
const router = express.Router()
const axios = require('axios')
const jwt = require('jwt-simple')
const queryString = require('query-string')

const {models} = require('../../db')

router.post('/', async (req, res, next) => {
    const token = req.body.token
    if (!token){
        res.send({})
        return
    }
    try {
        let decodedToken = jwt.decode(token, process.env.JWT_SECRET)
        let id = decodedToken.id
        let user = await models.Users.findByPk(id)
        if (!user){
            throw new Error('Bad token!')
        }
        res.send({id: user.id, githubUserId: user.githubUserId, isLoggedIn: true})
    } catch (err) {
        console.log(err)
    }
})

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

module.exports = router
