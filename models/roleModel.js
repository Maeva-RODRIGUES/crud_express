// label : superadmin, admin, user
// id : 1, 2, 3

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Role',
        {
            // Model attributes are defined here
            label: {
                type: DataTypes.STRING,
            },
        },
        {
            updatedAt: false,
            createdAt: false,
        },
    );
}