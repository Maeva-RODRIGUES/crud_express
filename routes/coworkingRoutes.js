const express = require('express')
const router = express.Router()
const coworkingsData = require('../coworkings')
const { Coworking } = require('../db/sequelizeSetup')

router
    .route('/')
    .get((req, res) => {
        res.json({ message: `Il y a ${coworkingsData.length} coworkings`, data: coworkingsData })
    })
    .post(async (req, res) => {
        try {
            const newCoworking = await Coworking.create(req.body)
            res.json({ message: `Un coworking a bien été ajouté`, data: newCoworking })
        } catch (error) {
            res.json({ message: `Une erreur est survenue`, data: error })
        }
    })

router
    .route('/:id')
    .get((req, res) => {
        const result = coworkingsData.find((el) => {
            return el.id === parseInt(req.params.id)
        })

        const msg = result ? `Nom du coworking n°${result.id} : ${result.name}` : `Le coworking recherché n'existe pas`

        res.json({ message: msg, data: result })
    })
    .put((req, res) => {
        const result = coworkingsData.find((el) => {
            return el.id === parseInt(req.params.id)
        })

        result.superficy = req.body.superficy
        res.json({ message: 'Le coworking a bien été modifié', data: result })
    })
    .delete((req, res) => {
        // on identifie la bonne ligne du tableau et on supprime l'élément s'il existe
        // let filteredArray = coworkingsData.filter(el => {
        //     return el.id !== parseInt(req.params.id)
        // })

        // coworkingsData = filteredArray

        const index = coworkingsData.findIndex((el) => {
            return el.id === parseInt(req.params.id)
        })

        coworkingsData.splice(index, 1)

        res.json({ message: 'delete coworking', data: coworkingsData })
    })

module.exports = router