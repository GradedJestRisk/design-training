const JSONAPIError = require('jsonapi-serializer').Error;
const httpCode = require('http-codes');

class BaseHttpError extends Error {
  constructor(message) {
    super(message);
    this.title = 'Default Bad Request';
    this.status = httpCode.BAD_REQUEST;
  }
}

class BadRequestError extends BaseHttpError {
  constructor(message, code) {
    super(message);
    this.title = 'Bad Request';
    this.status = httpCode.BAD_REQUEST;
    this.code = code;
  }
}

class InternalServerError extends BaseHttpError {
  constructor(message, code) {
    super(message);
    this.title = 'Internal server error';
    this.status = httpCode.INTERNAL_SERVER_ERROR;
    this.code = code;
  }
}

// TODO: redundant with error-serializer ?
function sendJsonApiError(httpError, h) {
  const jsonApiError = new JSONAPIError({
    status: httpError.status.toString(),
    title: httpError.title,
    detail: httpError.message,
  });
  return h.response(jsonApiError).code(httpError.status).takeover();
}

module.exports = {
  BaseHttpError,
  BadRequestError,
  InternalServerError,
  sendJsonApiError
}
