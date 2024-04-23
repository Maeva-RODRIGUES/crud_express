const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Coworking',
        {
            // Model attributes are defined here
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: {
                        msg: "Le nom doit avoir un nombre de caractères compris entre 3 et 50.",
                        args: [3, 50]
                    }
                },
            },
            superficy: {
                type: DataTypes.INTEGER,
                validate: {
                    isInt: {
                        msg: "La superficie doit être un entier.",
                    }
                },
            },
            capacity: {
                type: DataTypes.INTEGER,
                validate: {
                    isInt: {
                        msg: "La capacité doit être un entier.",
                    }
                },
            },
            price: {
                type: DataTypes.JSON,
            },
            address: {
                type: DataTypes.JSON,
            },
        },
        {
            // Other model options go here
        },
    );
}