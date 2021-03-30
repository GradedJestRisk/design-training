const errorMapper = require('./error-mapper');
const { BaseHttpError } = require('./http-errors');
const { DomainError } = require('./domain-errors');

function handleDomainAndHttpErrors(request, h) {
  const response = request.response;

  if (response instanceof DomainError || response instanceof BaseHttpError) {
    return errorMapper.handle(h, response);
  }

  return h.continue;
}

module.exports = {
  handleDomainAndHttpErrors,
};
