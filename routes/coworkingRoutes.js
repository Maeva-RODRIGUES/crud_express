const express = require('express')
const router = express.Router()
const { Coworking } = require('../db/sequelizeSetup')
const { findAllCoworkings, createCoworking, findCoworkingByPk, updateCoworking, deleteCoworking } = require('../controllers/coworkingControllers')

router
    .route('/')
    .get(findAllCoworkings)
    .post(createCoworking)

router
    .route('/:id')
    .get(findCoworkingByPk)
    .put(updateCoworking)
    .delete(deleteCoworking)

module.exports = router