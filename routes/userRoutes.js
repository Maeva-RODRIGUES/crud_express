const express = require('express')
const { findAllUsers, findUserByPk, createUser, updateProfile, updateUser, deleteUser, deleteProfile } = require('../controllers/userController')
const { login, logout } = require('../controllers/authController')
const { protect, restrictTo } = require('../middlewares/auth')
const router = express.Router()

router
    .route('/')
    .get(protect, restrictTo('admin'), findAllUsers)

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
    .get(protect, restrictTo('admin'), findUserByPk)
    .put(protect, restrictTo('admin'), updateUser)
    .delete(protect, restrictTo('superadmin'), deleteUser)

module.exports = router