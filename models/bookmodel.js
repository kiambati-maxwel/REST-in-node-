const mongoose = require('mongoose');
// const Schema = mongoose.Schema; -- destructured bellow

const { Schema } = mongoose;
const bookSchema = new Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  genre: {
    type: String,
  },
  read: {
    type: Boolean,
    default: false
  }
});

const bookModel = mongoose.model('books', bookSchema);

module.exports = bookModel;
