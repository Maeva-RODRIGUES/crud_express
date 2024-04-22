const express = require('express')
const router = express.Router()
const { Coworking } = require('../db/sequelizeSetup')
const { findAllCoworkings, createCoworking } = require('../controllers/coworkingControllers')

router
    .route('/')
    .get(findAllCoworkings)
    .post(createCoworking)

router
    .route('/:id')
    .get(async (req, res) => {
        try {
            const result = await Coworking.findByPk(req.params.id);
            if (!result) {
                return res.status(404).json({ message: `Le coworking n'existe pas` })
            }
            res.json({ message: 'Coworking trouvé', data: result })
        } catch (error) {
            res.status(500).json({ message: `Une erreur est survenue` })
        }
    })
    .put(async (req, res) => {
        try {
            const result = await Coworking.findByPk(req.params.id);
            if (!result) {
                return res.status(404).json({ message: `Le coworking n'existe pas` })
            }
            result.update(req.body)
            res.status(201).json({ message: 'Coworking modifié', data: result })
        } catch (error) {
            res.status(500).json({ message: `Une erreur est survenue` })
        }
    })
    .delete(async (req, res) => {
        try {
            const result = await Coworking.findByPk(req.params.id);
            if (!result) {
                return res.status(404).json({ message: `Le coworking n'existe pas` })
            }
            result.destroy()
            res.status(200).json({ message: 'Coworking supprimé', data: result })
        } catch (error) {
            res.status(500).json({ message: `Une erreur est survenue` })
        }
    })

module.exports = router