const findAllUsers = (req, res) => {
    res.json({ message: 'Hello utilisateur!' })
}

const findUserByPk = (req, res) => {
    res.json({ message: `Utilisateur n°${req.params.id}` })
}

const createUser = (req, res) => {
    res.json({ message: `Vous êtes bien sur la route signin` })
}

module.exports = { findAllUsers, findUserByPk, createUser }