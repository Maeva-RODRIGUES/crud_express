const { Op } = require('sequelize')
const { Coworking } = require('../db/sequelizeSetup')
const { errorHandler } = require('../errorHandler/errorHandler')

const findAllCoworkings = async (req, res) => {
    // A l'aide de req.query, on ajoute une fonction de recherche de Coworking sur critère du nom
    try {
        const results = await Coworking.findAll()
        res.json({ message: `Il y a ${results.length} coworkings`, data: results })
    } catch (error) {
        errorHandler(error, res)
    }
}

const searchCoworkings = async (req, res) => {
    // A l'aide de req.query, on ajoute une fonction de recherche de Coworking sur critère du nom
    try {
        const results = await Coworking.findAll(
            {
                where:
                    { name: { [Op.like]: `%${req.query.name}%` } }
            }
        )
        res.json({ message: `Il y a ${results.length} coworkings`, data: results })

    } catch (error) {
        errorHandler(error, res)
    }
}

const findCoworkingByPk = async (req, res) => {
    try {
        const result = await Coworking.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `Le coworking n'existe pas` })
        }
        res.json({ message: 'Coworking trouvé', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const createCoworking = async (req, res) => {
    try {
        const newCoworking = await Coworking.create(req.body)
        res.status(201).json({ message: `Un coworking a bien été ajouté`, data: newCoworking })
    } catch (error) {
        errorHandler(error, res)
    }
}

const updateCoworking = async (req, res) => {
    try {
        const result = await Coworking.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `Le coworking n'existe pas` })
        }
        await result.update(req.body)
        res.status(201).json({ message: 'Coworking modifié', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteCoworking = async (req, res) => {
    try {
        const result = await Coworking.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `Le coworking n'existe pas` })
        }
        result.destroy()
        res.status(200).json({ message: 'Coworking supprimé', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = {
    findAllCoworkings,
    createCoworking,
    findCoworkingByPk,
    updateCoworking,
    deleteCoworking,
    searchCoworkings
}