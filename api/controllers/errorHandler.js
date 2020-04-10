const NODE_ENV = require('../config/env');
const debug = require('debug')('errorHandler');
/**
 * Handles errors
 * @param {*} err err obj
 * @param {*} req express default request obj
 * @param {*} res express default response obj
 * @param {*} next express default next middleware obj
 * @prop {string} process.env.NODE_ENV if set to development then err details are provided
 */

 function errorHandler (err, req, res, next) {
   const error = {
     message: err.message || 'Something went wrong.',
     status: err.status
   }
   if(NODE_ENV === 'development') {
     if (err.stack) debug(err.stack);
     error.details = err.stack;
   }
   return res.status(err.status || 500).json({ error });
 }

 module.exports = errorHandler;
