const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('../models/User')


// Create Schema
const StudentBooksSchema = new Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'users',
        required: true
    },
    book_id: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'books',
        required: true
    },
    issuance_date: {
        type: Date,
    },
    request_date: {
        type: Date,
        default: Date.now()
    },
    return_date: {
        type: Date,
    },
    charges: {
        type: Number,
    },
    request_status: {
        type: String,
        default: "PENDING"
    },
})

module.exports = StudentBooks = mongoose.model('studentBooks', StudentBooksSchema)
