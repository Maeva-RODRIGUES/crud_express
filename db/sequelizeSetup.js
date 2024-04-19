// CONFIG MARIA DB
const { Sequelize } = require('sequelize');

// Option: Passing parameters separately (other dialects)
const sequelize = new Sequelize('bordeaux_coworkings', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))
// 

module.exports = { sequelize }