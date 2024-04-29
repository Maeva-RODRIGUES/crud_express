// CONFIG DB
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt')
const CoworkingModel = require('../models/coworkingModel')
const UserModel = require('../models/userModel')
const RoleModel = require('../models/roleModel')
const mockCoworkings = require('./coworkings');
const mockUsers = require('./users');


// Option: Passing parameters separately (other dialects)
const sequelize = new Sequelize('bx_coworkings', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

const Coworking = CoworkingModel(sequelize);
const User = UserModel(sequelize);
const Role = RoleModel(sequelize);

// Par défaut, tous les utilisateurs créés sont "user"
Role.hasMany(User, {
    foreignKey: {
        defaultValue: 3,
    },
});
User.belongsTo(Role);

sequelize.sync({ force: true })
    .then(() => {
        mockCoworkings.forEach(coworking => {
            Coworking.create(coworking)
                .then()
                .catch(error => {
                    console.log(error)
                })
        })

        Role.create({ id: 1, label: "superadmin" })
        Role.create({ id: 2, label: "admin" })
        Role.create({ id: 3, label: "user" })

        mockUsers.forEach(async user => {
            const hash = await bcrypt.hash(user.password, 10)
            user.password = hash
            User.create(user)
                .then()
                .catch(error => {
                    console.log(error)
                })
        })
    })
    .catch((error) => {
        console.log(error)
    })

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

module.exports = { sequelize, Coworking, User }

