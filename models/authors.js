const mongoose = require("mongoose");

//Define Schema
const Schema = mongoose.Schema;

//Define Book Schema
const authorSchema = mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
    },
    country: {
      type: String,
      required: false,      
    },
    books: {
      type: Array,
      default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
      },
    updatedAt: {
        type: Date,
        default: null,
    },
  })
  
  module.exports = mongoose.model('authors', authorSchema)