const chai = require('chai');
const expect = chai.expect;
const httpCode = require('http-codes');
const createServer  = require('../create-server')

describe('Hello route', async ()=>{

  let server;

  beforeEach( async ()=>{
    server = await createServer();
  })

  it('should respond BAD_REQUEST if request is invalid', async ()=>{

    const name = '12345678901'

    const request = {
      method: 'GET',
      url: `/hello/${name}`
    }

    const response = await server.inject(request)

    expect(response.statusCode).to.equal(httpCode.BAD_REQUEST)
  })

  it('should respond OK if request is valid', async ()=>{

    const name = '1234567890'

    const request = {
      method: 'GET',
      url: `/hello/${name}`
    }

    const response = await server.inject(request)

    expect(response.statusCode).to.equal(httpCode.OK)
  })

  it('should introduce', async ()=>{

    const name = '1234567890'
    const expected = "{\"personnalGreeting\":\"Hello, " + name +" !\"}"

    const request = {
      method: 'GET',
      url: `/hello/${name}`
    }

    const response = await server.inject(request)

    expect(response.payload).to.equal(expected)
  })

})
