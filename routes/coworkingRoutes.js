const express = require('express')
const router = express.Router()
const {
    findAllCoworkings,
    createCoworking,
    findCoworkingByPk,
    updateCoworking,
    deleteCoworking,
    searchCoworkings } = require('../controllers/coworkingControllers')

router
    .route('/')
    .get(findAllCoworkings)
    .post(createCoworking)

router
    .route('/search')
    .get(searchCoworkings)

router
    .route('/:id')
    .get(findCoworkingByPk)
    .put(updateCoworking)
    .delete(deleteCoworking)

module.exports = router