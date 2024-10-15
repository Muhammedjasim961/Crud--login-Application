"use strict";

var mongoose = require('mongoose'); //userSchema


var UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}); // Method to verify password
// UserSchema.methods.verifyPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };
// // Pre-save hook to hash the password
// UserSchema.pre('save', async function (next) {
//   if (this.isModified('password') || this.isNew) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

var User = module.exports = mongoose.model('User', UserSchema);