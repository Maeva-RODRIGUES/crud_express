const { User } = require("../db/sequelizeSetup")
const { errorValidationConstraint } = require("../errorHandler/errorValidationConstraint")

const findAllUsers = (req, res) => {
    res.json({ message: 'Hello utilisateur!' })
}

const findUserByPk = (req, res) => {
    res.json({ message: `Utilisateur n°${req.params.id}` })
}

const createUser = async (req, res) => {
    try {
        const result = await User.create(req.body)
        res.json({ message: `Utilisateur créé`, data: result })
    } catch (error) {
        errorValidationConstraint(error, res, "Nom d'utilisateur")
    }
}

module.exports = { findAllUsers, findUserByPk, createUser }