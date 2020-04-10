const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  profilePicUrl: {
    type: String
  },
  inventoryID:  { type: Schema.Types.ObjectId, ref: 'Inventory' }
});

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  } catch (err) {
    return next(err);
  }
});

const createUserMethods = lib => {
  return {
    async comparePassword(candidatePassword, next) {
      try {
        const isMatch = await lib.bcrypt.compare(candidatePassword, this.password);
        return isMatch;
      } catch (e) {
        return next(e);
      }
    }
  }
}
//returns all userShema methods
userSchema.methods = createUserMethods({ bcrypt });

const User = mongoose.model('User', userSchema);

module.exports = User;
