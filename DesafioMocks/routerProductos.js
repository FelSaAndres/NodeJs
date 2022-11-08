const express = require('express')
const knex = require('./server/scripts/mariaDB')
const routerProductos = express.Router()
const { Producto } = require('./productosClase')

routerProductos.use(express.json())
routerProductos.use(express.urlencoded({extended: true}))
const productos = new Producto()

routerProductos.post("/", (req, res) => {
    if (req.body.title && !Number.isNaN(req.body.price) && req.body.thumbnail) {
        let {title, price, thumbnail} = req.body
        const product = productos.save({title, price, thumbnail})
        res.redirect("/");
    }
    else{
        res.json({error: "formato de producto incorrecto"})
    }
})

routerProductos.post("", (req, res) =>{
    
})


module.exports = {routerProductos}