const helloUseCase = require('./hello-use-case');

const introduce = function(request) {
  const name = request.params.name;
  return helloUseCase.introduce(name);
};

module.exports = {
  introduce
}
