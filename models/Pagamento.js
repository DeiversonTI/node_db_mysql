const conn = require('./db')

const Pagamento = conn.sequelize.define('pagamentos', {

    nome: {
        type: conn.Sequelize.STRING
    },
    valor: {
        type: conn.Sequelize.STRING
    }
})

// Pagamento.sync({ force: true })

module.exports = Pagamento