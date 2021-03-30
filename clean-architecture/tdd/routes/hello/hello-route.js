const helloController = require('./hello-controller');
const Joi = require('joi');

const helloRoutes = [
  {
    method: 'GET',
    path: '/hello/{name}',
    config: {
      validate: {
        params: Joi.object({
          name: Joi.string().required().max(10)
        })
      },
      auth: false,
      handler: helloController.introduce
    },
  }
]

module.exports = helloRoutes;



