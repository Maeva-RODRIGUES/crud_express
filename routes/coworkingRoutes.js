const express = require('express')
const router = express.Router()
const coworkingsData = require('../coworkings')

router
    .route('/')
    .get((req, res) => {
        res.json({ message: `Il y a ${coworkingsData.length} coworkings`, data: coworkingsData })
    })
    .post((req, res) => {
        const newCoworking = req.body
        // const newId = on récupère le dernier élément du tableau, on prend son id, on lui ajoute 1 et on met ça dans newId 
        const newId = coworkingsData[coworkingsData.length - 1].id + 1
        newCoworking.id = newId
        newCoworking.created = new Date()
        // Ajoutons une date à la création du coworking
        coworkingsData.push(newCoworking)

        res.json({ message: `Un coworking a bien été ajouté`, data: newCoworking })
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
        let filteredArray = coworkingsData.filter(el => {
            return el.id !== parseInt(req.params.id)
        })

        coworkingsData = filteredArray

        res.json({ message: 'delete coworking' })
    })

module.exports = router
