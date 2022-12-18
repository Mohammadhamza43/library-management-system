const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const BookSchema = new Schema({
  book_name: {
    type: String,
    required: true
  },
  book_author: {
    type: String,
    required: true
  },
  book_price: {
    type: String,
    required: true
  },
  book_qty: {
    type: Number,
    required: true
  },
  book_status: {
    type: String,
    required: true
  },
  book_isbn: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Book = mongoose.model('books', BookSchema)
