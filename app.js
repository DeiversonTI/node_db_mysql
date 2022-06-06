const express = require('express')
const app = express()
// const handlebarsExp = require('express-handlebars')
const bodyParse = require('body-parser')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

app.use(bodyParse.urlencoded({ extended: false }))
const urlEnconderParser = bodyParse.urlencoded({ extended: false })
const { sequelize } = require('./models/db')
app.use(bodyParse.json())

const Pagamento = require('./models/Pagamento')

app.engine('handlebars', expressHandlebars.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get("/", (request, response) => {
    response.render('home')
})

app.get('/pagamento', (request, response) => {
    Pagamento.findAll({ order: [['id', 'DESC']] }).then(function (pagamentos) {
        response.render('pagamento', { pagamentos: pagamentos })
    })
})

app.get('/cad-pagamento', (request, response) => {
    response.render('cad-pagamento')
})

app.post('/add-pagamento', (request, response) => {
    Pagamento.create({
        nome: request.body.nome,
        valor: request.body.valor
    }).then(() => {
        response.redirect('/pagamento')
    }).catch(() => {
        console.log('error do pagamento')
    })

})

app.get('/del-pagamento/:id', (request, response) => {
    Pagamento.destroy({
        where: {
            'id': request.params.id
        }
    }).then(() => {
        response.redirect('/pagamento')
        // response.send('Apagado com Sucesso!')
    }).catch(() => {
        response.send('Não apagou')
    })
})

//PUXA SOMENTE O ID DO USUARIO QUE FOI SOLICIDADO NO PAGAMENTO
app.get('/update/:id', (request, response) => {

    var id = request.params.id
    var query = `SELECT * FROM pagamentos WHERE id = "${id}"`

    sequelize.query(query)
    .then((resp) => {
        console.log(JSON.stringify(resp, null, 2))
        response.render('update', { updates: resp[0] })
    })
    // Pagamento.findAll({
    //     where: {
    //         id: request.params.id,
    //     }
    // }).then((resp) => {
    //     console.log(JSON.stringify(resp, null, 2))
    //     response.render('update', { updates: resp })
    // })

})
//REALIZA O UPLOAD DO PAGAMENTO
app.post('/mensagem', urlEnconderParser, async (request, response) => {

    var nome = request.body.nome
    var valor = request.body.valor
    var id = request.body.id

    var query =
        `
    UPDATE pagamentos SET
    nome ="${nome}",
    valor = "${valor}"
    WHERE
    id = "${id}"
`

    sequelize.query(query)
        .then(() => {
            // console.log('Atualizado')
            response.render('mensagem')
        }).catch(() => {
            console.log('erro na atualização')
        })

    // await Pagamento.update()
})
app.listen(8080, () => console.log('Connected Success!!'))