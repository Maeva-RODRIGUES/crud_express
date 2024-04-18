const express = require('express')
const router = express.Router()

router
    .route('/')
    .get((req, res) => {
        res.json({ message: 'Hello utilisateur!' })
    })

router
    .route('/:id')
    .get((req, res) => {
        res.json({ message: `Utilisateur n°${req.params.id}` })
    })

module.exports = router