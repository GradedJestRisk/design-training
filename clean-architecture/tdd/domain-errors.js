class DomainError extends Error {
  constructor(message, code, meta) {
    super(message);
    this.code = code ;
    this.meta = meta ;
  }
}

class EntityValidationError extends DomainError {
  constructor({invalidAttributes}) {
    super('Echec de validation de l\'entité.');
    this.invalidAttributes = invalidAttributes;
  }
}


module.exports = {
  DomainError,
  EntityValidationError
};
