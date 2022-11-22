const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const path = require('path')

const routerGeneral = express.Router()

routerGeneral.use(session({
    secret: "PRIVATE",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: "mongodb+srv://proyectonode:proyectonode@cluster0.cynne3g.mongodb.net/?retryWrites=true&w=majority"}),
    cookie: {
        maxAge: 500000
    }
}))

routerGeneral.get('/', (req, res) => {
    res.redirect('/login')
})

routerGeneral.get('/home', (req, res) => {
    const user = req.session?.user
    res.render(path.join(process.cwd(), '/views/home.ejs'),{user})
})

routerGeneral.get('/login', (req, res) => {
    const user = req.session?.user
    if (user) {
        res.redirect('/home')
    } else {
        res.sendFile(path.join(process.cwd(), '/views/partials/login.html'))
    }
})

routerGeneral.get('/logout', (req, res) => {
    const user = req.session?.user
    if (user) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), '/views/logout.ejs'), {user})
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
});


routerGeneral.post('/login', (req, res) => {
    console.log(req.session)
    console.log(req.body)

    req.session.user = req.body.username

    res.redirect('/home')
})

function Verificacion(req, res, next) {
    if(req.session.username){
        next()
    }
    else{
        res.redirect('/login')
    }
}

module.exports = {routerGeneral}