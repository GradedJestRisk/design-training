const _ = require('lodash');
const JSONAPIError = require('jsonapi-serializer').Error;
const HttpErrors = require('./http-errors');
const DomainErrors = require('./domain-errors');
const errorSerializer = require('./error-serializer');

const NOT_VALID_RELATIONSHIPS = ['externalId'];

const httpCode = require('http-codes');

function handle(h, error) {
  if (error instanceof DomainErrors.EntityValidationError) {
    const jsonApiError = new JSONAPIError(error.invalidAttributes.map(_formatInvalidAttribute));
    return h.response(jsonApiError).code(httpCode.UNPROCESSABLE_ENTITY);
  }

  const httpError = _mapToHttpError(error);

  return h.response(errorSerializer.serialize(httpError)).code(httpError.status);
}

function _formatInvalidAttribute({ attribute, message }) {
  if (!attribute) {
    return _formatUndefinedAttribute({ message });
  }
  if (attribute.endsWith('Id') && !NOT_VALID_RELATIONSHIPS.includes(attribute)) {
    return _formatRelationship({ attribute, message });
  }
  return _formatAttribute({ attribute, message });
}


function _formatAttribute({ attribute, message }) {
  return {
    status: `${httpCode.UNPROCESSABLE_ENTITY}`,
    source: {
      pointer: `/data/attributes/${ _.kebabCase(attribute) }`,
    },
    title: `Invalid data attribute "${ attribute }"`,
    detail: message,
  };
}

function _formatRelationship({ attribute, message }) {
  const relashionship = attribute.replace('Id', '');
  return {
    status: `${httpCode.UNPROCESSABLE_ENTITY}`,
    source: {
      pointer: `/data/relationships/${ _.kebabCase(relashionship) }`,
    },
    title: `Invalid relationship "${ relashionship }"`,
    detail: message,
  };
}

function _formatUndefinedAttribute({ message }) {
  return {
    status: `${httpCode.UNPROCESSABLE_ENTITY}`,
    title: 'Invalid data attributes',
    detail: message,
  };
}


function _mapToHttpError(error) {

  if (error instanceof HttpErrors.BaseHttpError) {
    return error;
  }

  return new HttpErrors.BaseHttpError(error.message);
}


module.exports = { handle };
