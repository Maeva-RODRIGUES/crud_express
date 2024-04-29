const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../configs/privatekey');
const { User } = require('../db/sequelizeSetup');


const protect = async (req, res, next) => {
    // 1. On vérifie la présence du token
    const token = req.cookies.access_token
    if (!token) {
        return res.status(401).json({ message: "Non authentifié" })
    }

    // 2. On vérifie la validité du token
    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        // On vérifie que l'id contenu dans le token correspond toujours à un utilisateur dans la bdd
        const result = await User.findByPk(decoded.userId)
        // console.log(result)
        if (!result) {
            return res.status(404).json({ message: `L'utilisateur n'existe pas` })
        }

        req.userId = decoded.userId
        next()
    } catch (error) {
        return res.status(401).json({ message: "Jeton non valide" })
    }
}

module.exports = { protect }