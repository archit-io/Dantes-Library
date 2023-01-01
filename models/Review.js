const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    book: {
      type: String,
      required: true
    },
    thumbnailImage: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  })

module.exports = mongoose.model('Review', ReviewSchema)