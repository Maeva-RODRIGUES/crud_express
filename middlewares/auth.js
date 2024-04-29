const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../configs/privatekey');
const { User, Role } = require('../db/sequelizeSetup');
const { errorHandler } = require('../errorHandler/errorHandler');

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
        if (!result) {
            return res.status(404).json({ message: `Vous n'êtes pas authentifié` })
        }

        req.userId = decoded.userId
        next()
    } catch (error) {
        return res.status(401).json({ message: "Jeton non valide" })
    }
}

const restrictTo = (labelRole) => {
    return async (req, res, next) => {
        try {
            // 1. on récupère l'utilisateur courant grace au req.userId
            const result = await User.findByPk(req.userId);
            // 2. on compare le role de l'utilisateur courant avec le role passé en paramètre
            // User.findByPk(req.userId)
            const role = await Role.findByPk(result.RoleId)
            if (role.label !== labelRole) {
                return res.status(403).json({ message: "Droits insuffisants" })
            }

            next()
        } catch (error) {
            errorHandler(error)
        }
    }
}

module.exports = { protect, restrictTo }