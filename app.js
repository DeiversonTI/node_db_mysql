const express = require('express')
const app = express()
// const handlebarsExp = require('express-handlebars')
const bodyParse = require('body-parser')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

app.use(bodyParse.urlencoded({ extended: false }))
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

app.get('/update/:id', (request, response) => {
    Pagamento.findAll().then(function (update) {
        response.render('update', { updates: update })       
    })
})

app.post('/update/:id', async (request, response) => {
    await Pagamento.update(
        
        { nome: request.body.nome, valor: request.body.valor },
        {
            where: { id: request.params.id }
    }).then(() => {
        
        // console.log(resp)
        // response.redirect('/update')
        response.send('Atualizado com Sucesso!')
    }).catch((error) => {
        response.send('Não apagou' + error)
    })
})
app.listen(8080, () => console.log('Connected Success!!'))