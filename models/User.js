const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  }
)

// After user saved the password: hash
UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
    next();
  } catch (e) { next(e); }
});

module.exports = mongoose.model('User', UserSchema)