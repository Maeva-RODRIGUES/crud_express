const express = require('express')
const router = express.Router()
const { protect } = require('../middlewares/auth')
const { createReview, findAllReviews, findReviewByPk, updateReview, deleteReview } = require('../controllers/reviewController')

router
    .route('/')
    .get(findAllReviews)
    .post(protect, createReview)

router
    .route('/:id')
    .get(findReviewByPk)
    .put(protect, updateReview)
    .delete(protect, deleteReview)

module.exports = router