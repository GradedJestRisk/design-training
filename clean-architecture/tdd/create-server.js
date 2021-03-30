const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const configuration = require('./configuration');
const { handleFailAction } = require('./validate');
const preResponse = require('./pre-response');
const httpCode = require('http-codes');
const plugins = require('./plugins');

const createServer = async () => {

  const server = new Hapi.server({
    compression: false,
    routes: {
      validate: {
        failAction: handleFailAction,
      },
      response: {
        emptyStatusCode: httpCode.NO_CONTENT,
      },
    },
    port: configuration.port,
    router: {
      isCaseSensitive: false,
      stripTrailingSlash: true,
    },
  });

  server.ext('onPreResponse', preResponse.handleDomainAndHttpErrors);

  await server.register(plugins);
  await server.route(routes);

  return server;
};

module.exports = createServer;
