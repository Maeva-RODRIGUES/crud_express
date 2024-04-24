const { UniqueConstraintError, ValidationError } = require("sequelize")

const errorValidationConstraint = (error, res, msg) => {
    if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: `${msg} déjà pris` })
    }
    if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message })
    }
    res.status(500).json({ message: `Une erreur est survenue` })
}

module.exports = { errorValidationConstraint }