const express = require('express')
const { findAllUsers, findUserByPk, createUser, updateProfile, updateUser, deleteUser, deleteProfile } = require('../controllers/userController')
const { login, logout } = require('../controllers/authController')
const { protect } = require('../middlewares/auth')
const router = express.Router()

router
    .route('/')
    .get(findAllUsers)

router
    .route('/signup')
    .post(createUser)

router
    .route('/profile/')
    .put(protect, updateProfile)
    .delete(protect, deleteProfile)

router
    .route('/login')
    .post(login)

router
    .route('/logout')
    .post(logout)

router
    .route('/:id')
    .get(findUserByPk)
    .put(protect, updateUser) // restrictTo('superadmin')
    .delete(protect, deleteUser) // restrictTo('superadmin')

module.exports = router