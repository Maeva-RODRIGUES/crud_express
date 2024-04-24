const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'User',
        {
            // Model attributes are defined here
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: {
                        msg: "Le nom d'utilisateur doit avoir un nombre de caractères compris entre 8 et 50.",
                        args: [8, 50]
                    }
                },
            },
            password: {
                type: DataTypes.STRING
            }
        },
        {
            // Other model options go here
        },
    );
}