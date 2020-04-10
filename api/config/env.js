const variables = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  dbUri: process.env.dbUri || "mongodb://localhost/quantine",
  PORT: process.env.PORT || 8081,
  JWT_SECRET: process.env.JWT_SECRET || "THIS SECRET IS NOT FOR PRODUCTION"
};

module.exports = { ...variables };
