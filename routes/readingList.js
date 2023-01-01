const express = require('express')
const router = express.Router()
const readinglistController = require('../controllers/readingList') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, readinglistController.getReadinglist)

router.post('/addToReadinglist', readinglistController.addToReadinglist)

router.delete('/deleteReadinglistItem', readinglistController.deleteReadinglistItem)

module.exports = router