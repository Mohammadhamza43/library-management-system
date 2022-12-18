const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('../models/User')


// Create Schema
const AdminSchema = new Schema({
  designation: {
    type: String,
    required: true
  },
})

module.exports = Admin = User.discriminator('admins', AdminSchema)
