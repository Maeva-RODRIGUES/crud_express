const express = require('express')
const router = express.Router()
const {
    findAllCoworkings,
    createCoworking,
    findCoworkingByPk,
    updateCoworking,
    deleteCoworking,
    searchCoworkings,
    findAllCoworkingsRawSQL } = require('../controllers/coworkingControllers')
const { protect, restrictToOwnUser } = require('../middlewares/auth')
const { Coworking } = require('../db/sequelizeSetup')

router
    .route('/')
    .get(findAllCoworkings)
    .post(protect, createCoworking)

router
    .route('/rawSQL')
    .get(findAllCoworkingsRawSQL)

router
    .route('/search')
    .get(searchCoworkings)

router
    .route('/:id')
    .get(findCoworkingByPk)
    .put(protect, restrictToOwnUser(Coworking), updateCoworking)
    .delete(protect, restrictToOwnUser(Coworking), deleteCoworking)

module.exports = router