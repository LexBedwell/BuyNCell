const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

const server = require('../server')

chai.use(chaiHttp)

describe('Categories Route', () => {

    describe('GET /categories', () => {
        chai.request(server)
            .get('api/categories')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(2)
            })
            done()
    })

})

describe('Products Route', () => {

    describe('GET /products', () => {
        chai.request(server)
            .get('api/products/1')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('name').eql('Regular Celery')
            })
            done()
    })

    //Test orders route

})

