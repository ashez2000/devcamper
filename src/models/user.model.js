const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const ErrorResponse = require('../utils/error.util')

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
})

// hash password
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// sign token
UserSchema.methods.getJWT = function () {
  const user = {
    id: this._id,
    role: this.role,
  }

  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  })
}

// json response
UserSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password

  return user
}

// find user with email and password
UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password')
  if (!user) {
    throw new ErrorResponse('Invalid credentials', 401)
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new ErrorResponse('Invalid credentials', 401)
  }

  return user
}

module.exports = mongoose.model('User', UserSchema)
