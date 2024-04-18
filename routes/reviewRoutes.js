const express = require('express')
const router = express.Router()

router
    .route('/')
    .get((req, res) => {
        res.json({ message: 'Hello Commentaire!' })
    })

router
    .route('/:id')
    .get((req, res) => {
        res.json({ message: `Commentaire n°${req.params.id}` })
    })

module.exports = router