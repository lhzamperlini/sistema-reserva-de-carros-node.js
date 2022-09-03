const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const conn = require('./db/conn')
const tripController = require('./controllers/TripController')

const app = express()
//Importando Rotas
const tripRoutes = require('./routes/TripRoutes')
const userRoutes = require('./routes/UserRoutes')

//Models
const approvedTrip = require('./models/ApprovedTrip')
const pendingTrip = require('./models/PendingTrip')
const user = require('./models/User')

//Configurando Template Engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(
    express.urlencoded({
        extended: true,
    })
);

//Middleware que recebe o dado JSON
app.use(express.json())

//Session Middleware
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUnitialized: false,
        store: new FileStore({
            logFn: function () { },
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }))

//Flash Messages
app.use(flash())

//Public path
app.use(express.static('public'))

//Configurando a resposta da Sessão
app.use((req, res, next) => {

    if (req.session.userid) {
        res.locals.session = req.session
    }

    next()
})

//Rotas
app.use('/trips', tripRoutes)
app.use('/', userRoutes)

//Definindo Rota Padrão
app.use('/', tripController.scheduleTrip)

conn.sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => console.log(err))