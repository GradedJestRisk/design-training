// TODO: Replace with http-error
const Boom = require('@hapi/boom');
const packageJSON = require('../../package.json');
const configuration = require('../../configuration');
const { InternalServerError } = require('../../http-errors');

const introduce = function() {
  return {
    'name': packageJSON.name,
    'version': packageJSON.version,
    'description': packageJSON.description,
    'environment': configuration.environment,
    'container-version': process.env.CONTAINER_VERSION,
    'container-app-name': process.env.APP,
  };
};

const crashTest = function(){
  //throw new InternalServerError()
   const foo = undefined.foo;
};


module.exports = {
  introduce,
  crashTest
}
