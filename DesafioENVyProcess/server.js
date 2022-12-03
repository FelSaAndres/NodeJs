const express = require('express')
const { routerGeneral } = require('./routes/connection.js')
const parseArgs = require('minimist')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static("/public"))
app.use("/", routerGeneral)

app.set("view engine", "ejs");
app.set("views", "./views");

const args = parseArgs(process.argv.splice(2) ,{default: {puerto: 8080}})

const PORT = args.puerto

const server = app.listen(PORT, () => {
	console.log(`Servidor conectado en puerto ${server.address().port}`)
})
server.on("error", (error) => console.log(`Error en servidor ${error}`))