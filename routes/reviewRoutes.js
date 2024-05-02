const express = require('express')
const router = express.Router()
const { protect, restrictToOwnUser } = require('../middlewares/auth')
const { createReview, findAllReviews, findReviewByPk, updateReview, deleteReview } = require('../controllers/reviewController')

router
    .route('/')
    .get(findAllReviews)
    .post(protect, createReview)

router
    .route('/:id')
    .get(findReviewByPk)
    .put(protect, restrictToOwnUser, updateReview)
    .delete(protect, restrictToOwnUser, deleteReview)

module.exports = router