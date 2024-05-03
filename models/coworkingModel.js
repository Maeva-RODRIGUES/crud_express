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
            // implémenter une custom validation, au moins un des 3 prix doit être renseigné
            price: {
                type: DataTypes.JSON,
                validate: {
                    isPriceValid(value) {
                        if (value.hasOwnProperty("hour") && value.hasOwnProperty("day") && value.hasOwnProperty("month")) {
                            if (value.hour === null && value.day === null && value.month === null) {
                                throw new Error("Le prix n'est pas valide");
                            }
                        } else {
                            throw new Error("La syntaxe du prix n'est pas correcte.");
                        }
                    },
                }
            },
            address: {
                type: DataTypes.JSON,
            },
            imageUrl: {
                type: DataTypes.STRING,
            },
        },
        {
            // Other model options go here
        },
    );
}