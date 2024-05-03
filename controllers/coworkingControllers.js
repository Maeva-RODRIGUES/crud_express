const { Op, QueryTypes } = require('sequelize')
const { Coworking, sequelize } = require('../db/sequelizeSetup')
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

// On utilise la méthode sequelize.query() pour écrire une requête SQL en dur, SELECT name, rating FROM Coworking
const findAllCoworkingsRawSQL = async (req, res) => {
    try {
        const result = await sequelize.query("SELECT name, rating FROM coworkings LEFT JOIN reviews ON coworkings.id = reviews.CoworkingId", {
            type: QueryTypes.SELECT,
        })
        res.json({ data: result })
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
        req.body.UserId = req.user.id
        const newCoworking = await Coworking.create(req.body)
        res.status(201).json({ message: `Un coworking a bien été ajouté`, data: newCoworking })
    } catch (error) {
        errorHandler(error, res)
    }
}

const createCoworkingWithImg = async (req, res) => {
    console.log(req.protocol, req.get('host'), req.file.filename)
    try {
        req.body.UserId = req.user.id
        req.body.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
    createCoworkingWithImg,
    findCoworkingByPk,
    updateCoworking,
    deleteCoworking,
    searchCoworkings,
    findAllCoworkingsRawSQL
}