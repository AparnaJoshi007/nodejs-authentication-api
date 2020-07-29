import mongoose from 'mongoose';
import {
  compare,
  genSalt,
  hash,
} from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, required: true },
  name: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});


UserSchema.methods.comparePassword = function (password) {
  return compare(password, this.password);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
  } catch (e) {
    next(e);
  }
});

export default UserSchema;
