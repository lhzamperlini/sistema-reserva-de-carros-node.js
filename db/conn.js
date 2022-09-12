const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('dbdefen', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('DB Conectado')
} catch (error) {
    console.log(`Não deu para conectar ${error}`)
}

module.exports = sequelize