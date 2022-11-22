const express = require('express')
const { routerGeneral } = require('./routes/connection.js')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static("/public"))
app.use("/", routerGeneral)

app.set("view engine", "ejs");
app.set("views", "./views");

const PORT = process.env.port || 8080

const server = app.listen(PORT, () => {
	console.log(`Servidor conecado en puerto ${server.address().port}`)
})
server.on("error", (error) => console.log(`Error en servidor ${error}`))