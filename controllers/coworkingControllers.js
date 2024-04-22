const { Coworking } = require('../db/sequelizeSetup')

const findAllCoworkings = async (req, res) => {
    try {
        const results = await Coworking.findAll()
        res.json({ message: `Il y a ${results.length} coworkings`, data: results })
    } catch (error) {
        res.status(500).json({ message: `Une erreur est survenue` })
    }
}

const createCoworking = async (req, res) => {
    try {
        const newCoworking = await Coworking.create(req.body)
        res.status(201).json({ message: `Un coworking a bien été ajouté`, data: newCoworking })
    } catch (error) {
        res.status(500).json({ message: `Une erreur est survenue`, data: error })
    }
}

module.exports = {
    findAllCoworkings, createCoworking
}