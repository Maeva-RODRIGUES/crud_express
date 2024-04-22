const express = require('express')
const router = express.Router()
const coworkingsData = require('../coworkings')
const { Coworking } = require('../db/sequelizeSetup')

router
    .route('/')
    .get(async (req, res) => {
       try {
         // Récupère tous les enregistrements de la table Coworking
        const results = await Coworking.findAll ();
         // Envoie une réponse JSON réussie avec les données des coworkings = SUCCES
        res.json({ message: `Il y a ${results.length} coworkings`, data: results })
        // Envoie une réponse JSON en cas d'erreur avec le message d'erreur = FAILURE
       } catch (error) {
        res.json({ message: `Une erreur est survenue`, data: error })
       }
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
    .get(async(req, res) => {
        try{
        const result = await Coworking.findByPk(req.params.id);
        res.json({ message: msg, data: result })

        } catch (error) {
            res.json({ message: `Une erreur est survenue`, data: error })
        }
        })

        .put(async (req, res) => {
            try {
                const result = await Coworking.findByPk(req.params.id);
                if (!result) {
                    return res.json({ message: `Le coworking n'existe pas` })
                }
                result.update(req.body)
                res.json({ message: 'Coworking modifié', data: result })
            } catch (error) {
                res.json({ message: `Une erreur est survenue` })
            }
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