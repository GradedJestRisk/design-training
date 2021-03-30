const configuration = {

  port: parseInt(process.env.PORT, 10) || 3000,

  environment: (process.env.NODE_ENV || 'development'),

  hapi: {
    options: {},
  }

};

module.exports = configuration;
