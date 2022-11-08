const express = require("express")
const {Server: IOServer} = require('socket.io')
const {Server: HttpServer} = require('http')
const { routerProductos } = require("../routerProductos")
const { routerProductosTest } = require("../routerProductosTest")
const { Producto } = require("../productosClase")
const { Mensajes } = require('./mensajesClase')


const app = express()
const httpserver = new HttpServer(app)
const io = new IOServer(httpserver)
const producto = new Producto()
const mensaje = new Mensajes()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static("public"))

app.get("/", (req, res) =>{
    res.sendFile("index.html")
})

app.use("/", routerProductos)
app.use("/api/productos-test", routerProductosTest)

app.set("socketio", io)
io.on("connection", async(socket) =>{
    console.log("Nuevo usuario conectado")
    let lista = await mensaje.getAll()

    socket.emit("productos", await producto.getAllTest())

    socket.on("new-product", (data) => {
        producto.save(data)
        console.log(data)
        io.sockets.emit("productos", producto.getAll())
    })

    socket.emit("mensajes", lista)
    
    socket.on("new-mensaje", async(data) =>{
        const date = new Date()
        await mensaje.save({...data, fecha: `${date.toLocaleDateString("es-AR")} ${date.toLocaleTimeString("es-AR")}`})
        const lista = await mensaje.getAll()
        io.sockets.emit("mensajes", lista)
    })
})

httpserver.listen(8080, () =>{
    console.log("Servidor conectado en puerto" + " " + httpserver.address().port)
})
