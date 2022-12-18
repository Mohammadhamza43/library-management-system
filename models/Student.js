const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('../models/User')


// Create Schema
const StudentSchema = new Schema({
    designation: {
        type: String,
        required: true
    },
})

module.exports = Student = User.discriminator('students', StudentSchema)
