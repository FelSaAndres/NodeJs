const express = require('express')
const { Producto } = require('./productosClase')
const routerProductosTest = express.Router()

const producto = new Producto()

routerProductosTest.get("/", async(req, res) =>{
    const lista = await producto.getAllTest()
    res.json(lista)
})


module.exports = {routerProductosTest}