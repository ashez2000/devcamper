const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/error.util')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  role: {
    type: String,
    enum: ['user', 'publisher'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false,
  },
})

// hash password
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// sign token
UserSchema.methods.getJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
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
