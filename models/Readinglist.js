const mongoose = require('mongoose')

const ReadinglistSchema = new mongoose.Schema({
  book: {
    type: String,
    required: true,
  },
  thumbnailImage: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})


module.exports = mongoose.model('Readinglist', ReadinglistSchema)
