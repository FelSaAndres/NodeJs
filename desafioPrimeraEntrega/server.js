const express = require('express')
const {routerProductos} = require('./router/routerProductos')
const {routerCarrito} = require('./router/routerCarrito')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/carritos", routerCarrito)
app.use("/api/productos", routerProductos)

//app.use("/public", express.static("public"))

const server = app.listen(8080, () => {
    console.log("Server conectando al puerto" + " " + server.address().port)
})
server.on("error", error => console.log(error)); 
