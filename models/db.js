const Sequelize = require('sequelize')

// const sequelize = new Sequelize('caro', 'root', '123456', {
//     host: 'localhost',
//     dialect: 'mysql'

// })


const sequelize = new Sequelize('ersvp298_carodromo', 'ersvp298_UseCaro' , '+7yd83mD[XY+', {
    host: '192.185.208.53', 
    dialect: 'mysql',
    port: 3306

})
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
} 





