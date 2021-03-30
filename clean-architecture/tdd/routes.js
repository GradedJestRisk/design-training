const _ = require('lodash');

const routes = _.concat(
  require('./routes/healthcheck/healthcheck-route'),
  require('./routes/hello/hello-route'));

module.exports = routes;
