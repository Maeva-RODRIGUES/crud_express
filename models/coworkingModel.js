const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Coworking',
        {
            // Model attributes are defined here
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            superficy: {
                type: DataTypes.INTEGER,
            },
            capacity: {
                type: DataTypes.INTEGER,
            },
        },
        {
            // Other model options go here
        },
    );
}