const express = require('express')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const MongoStore = require('connect-mongo')
const { Users } = require('../class/usersClass')
const path = require('path')
const { fork } = require("child_process")
const child = fork('./random.js')

const routerGeneral = express.Router()
const user = new Users()

routerGeneral.use(session({
    secret: "PRIVATE",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: "mongodb+srv://proyectonode:proyectonode@cluster0.cynne3g.mongodb.net/?retryWrites=true&w=majority"}),
    cookie: {
        maxAge: 400000
    }
}))

routerGeneral.use(passport.initialize())
routerGeneral.use(passport.session())

passport.use("register", new LocalStrategy(
    {passReqToCallback: true},
    async (req, username, password, done) =>{
        const list = await user.getAll()
        const exist = list.find((newUser) => {
            return newUser.nombre == username
        })
        
        if(exist){return done(null, false)}
        else{
            await user.newUser({username, password})
            return done(null, {nombre: username})
        }
    }
))

passport.use('login', new LocalStrategy(
    async (username, password, done) =>{
        const list = await user.getAll()
        const exist = list.find((user) => {
            return user.username == username && user.password == password
        })

        if(!exist){ return done(null, false)}
        else{ return done(null, exist)}
    }
))

/*Serializar y deserializar*/

passport.serializeUser((usuario, done) =>{
    done(null, usuario.username)
})

passport.deserializeUser(async(nombre, done) =>{
    const list = await user.getAll()
    const userfind = list.find((aux) =>{return aux.username == nombre})
    done(null, userfind)
})

/*---------------------------------*/

/*Iniciar sesion y registro*/

routerGeneral.get('/', (req, res) => {
    res.redirect('/login')
})

routerGeneral.get('/registrar', (req, res) =>{
    res.sendFile(path.join(process.cwd(), '/views/partials/register.html'))
})

routerGeneral.post('/registrar', passport.authenticate('register', {
    successRedirect: '/home',
    failureRedirect: '/register-error'
}))

routerGeneral.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/login-error'
}))


/*---------------------------------*/

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
})


/*Paginas de errores*/

routerGeneral.get('/register-error', (req, res) => {
    res.render(path.join(process.cwd(), '/views/register-error.ejs'))
})

routerGeneral.get('/login-error', (req, res) =>{
    res.render(path.join(process.cwd(), '/views/login-error.ejs'))
})

/*function Verificacion(req, res, next) {
    if(req.session.username){
        next()
    }
    else{
        res.redirect('/login')
    }
}*/

routerGeneral.get("/info", (req, res) =>{
    const object = {
        Argument: process.argv,
        Platform: process.platform,
        Node: process.version,
        Memory: process.memoryUsage(),
        Path: process.execPath,
        //ID: `${process.getegid()}`,
        Directory: process.report.directory
    }
    res.send({object})
})

routerGeneral.get("/random", (req, res) => {
    const random = req.query.cant || 100000000
    child.send(random)
    child.on("message", (msg) => {
        {res.end(msg)}
    })
})


module.exports = {routerGeneral}