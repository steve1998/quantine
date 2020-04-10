const jwt = require('jsonwebtoken');
const { user } = require('../core/user');
const { JWT_SECRET } = require('../config/env');

/**
 * Create new jwt token
 * @param {*} obj payload obj
 */
const createToken = (obj) => {
  const { email, fullName, profilePicUrl, inventoryID } = obj;
  const token = jwt.sign({ email, fullName, profilePicUrl, inventoryID }, JWT_SECRET);
  return { email, fullName, profilePicUrl, inventoryID, token };
}

/**
 * Factory function, returning the auth methods
 * Note: Here "user" refers to User core methods, while "User" is the result of these methods. user.findOne is also from User core methods.
 */
const createAuthMethods = () => {
  return {
    /**
     * Registration
     */
    async signup(req, res, next) {
      try {
        const User = await user.create(req.body);
        if (User instanceof Error) {throw new Error(User.message)}
        const data = await createToken(User);
        return res.status(201).json(data);
      } catch (err) {
        return next({
          status: 400,
          message: err.message
        });
      }
    },
    /**
     * Login
     */
    async signin(req, res, next) {
      const err_invalid = { status: 400, message: 'Invalid Email or Password.' };
      try {
        const User = await user.findOne(req.body);
        const isMatch = User.comparePassword(req.body.password);
        if(isMatch) {
          const data = createToken(User);
          return res.status(200).json(data);
        } else {
          return next(err_invalid);
        }
      } catch (err) {
        return  next(err_invalid);
      }
    }
  }
}

const auth = createAuthMethods();

module.exports = { createAuthMethods, auth };
