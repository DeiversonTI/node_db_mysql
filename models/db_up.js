const conn = require('./db')

const Upload = conn.sequelize.define('uploads', {

    id: {
        type: conn.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Imagens: {
        type: conn.Sequelize.STRING
    },
    Name: {
        type: conn.Sequelize.STRING
    }
})

// Upload.sync({ force: true })

module.exports = Upload