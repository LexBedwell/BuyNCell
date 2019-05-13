const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

const {app} = require('../server')

chai.use(chaiHttp)

describe('Server Health Check', () => {

    describe('GET /api/ping', () => {
      it('it should respond with pong', (done) => {
        chai.request(app)
          .get('/api/ping')
          .end((_err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('response').eql('pong')
            done()
          })
      })
    })
  
})
