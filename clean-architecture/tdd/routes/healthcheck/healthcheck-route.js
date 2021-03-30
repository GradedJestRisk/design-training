const healthcheckController = require('./healthcheck-controller');

const healthcheckRoutes = [
  {
    method: 'GET',
    path: '/healthcheck/introduce',
    config: {
      auth: false,
      handler: healthcheckController.introduce
    },
  },
  {
    method: 'GET',
    path: '/healthcheck/crash',
    config: {
      auth: false,
      handler: healthcheckController.crashTest
    }
  },
]

module.exports = healthcheckRoutes;



