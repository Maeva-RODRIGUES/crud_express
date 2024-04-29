const { User } = require("../db/sequelizeSetup")
const bcrypt = require('bcrypt');
const { errorHandler } = require("../errorHandler/errorHandler")

const findAllUsers = (req, res) => {
    res.json({ message: 'Hello utilisateur!' })
}

const findUserByPk = (req, res) => {
    res.json({ message: `Utilisateur n°${req.params.id}` })
}

const createUser = async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 5)
        req.body.password = hashPassword
        const result = await User.create(req.body)
        res.json({ message: `Utilisateur créé`, data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const updateUser = async (req, res) => {
    try {
        const result = await User.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `L'utilisateur n'existe pas` })
        }
        if (req.body.password) {
            const hash = await bcrypt.hash(req.body.password, 8)
            req.body.password = hash
        }
        await result.update(req.body)
        res.status(201).json({ message: 'Utilisateur modifié', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteUser = async (req, res) => {
    try {
        const result = await User.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `L'utilisateur n'existe pas` })
        }

        await result.destroy()
        res.status(200).json({ message: 'Utilisateur supprimé', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const updateProfile = async (req, res) => {
    // 1. récupérer la ligne de l'utilisateur au sein de la table User, sans le req.params.id
    try {
        const result = await User.findByPk(req.userId);
        if (req.body.password) {
            const hash = await bcrypt.hash(req.body.password, 8)
            req.body.password = hash
        }
        // 2. on modifie les propriétés fournies dans le req.body
        await result.update(req.body)
        // result.password = "hidden"
        res.status(201).json({ message: 'Utilisateur modifié', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteProfile = async (req, res) => {
    // 1. récupérer la ligne de l'utilisateur au sein de la table User, sans le req.params.id
    try {
        const result = await User.findByPk(req.userId);
        console.log('find in deleProfile controller', result)
        await result.destroy()
        // result.password = "hidden"
        res.clearCookie('access_token').status(200).json({ message: 'Utilisateur supprimé', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}



module.exports = { findAllUsers, findUserByPk, createUser, updateProfile, updateUser, deleteUser, deleteProfile }