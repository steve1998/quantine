const User = require('../models/user');

const createUserMethods = (UserModel) => {
  return {
    /**
    * Find one User by email
    *  @param {*} search search obj
    */
    async findOne(search) {
      try {
      const user = await UserModel.findOne({
        email: search.email
      });
      return user;
      } catch (err) {
        return err;
      }
    },
    /**
    * Create new user
    * @param {*} userObj user object
    */
    async create (userObj) {
      try {
        const user = await UserModel.create({...userObj});
        const foundUser = await UserModel.findById(user._id);
        return foundUser;
      } catch (err) {
        if (err.code === 11000) {
          /* violating the constraint SchemaType.prototype.unique()
          error code 11000
          */
          err.message = 'Sorry, that email is taken';
        } else {
          err.message = 'Oops! Something went wrong.';
        }
        return new Error(err.message);
      }
    }
  }
}

const user = createUserMethods(User)
module.exports = {createUserMethods, user}
