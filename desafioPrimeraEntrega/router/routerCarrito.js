const express = require('express')
const routerCarrito = express.Router()
const { Carrito } = require('../clases/carritoClase')
const { Productos } = require('../clases/productosClase')

const producto = new Productos()
const carrito = new Carrito()

routerCarrito.get("/:id", async(req, res) => {
    if (!Number.isNaN(req.params.id)) {
        const products = await carrito.allProductsInCart(parseInt(req.params.id))
        if(products != null){res.json(products)}
        else{res.send({error: "Este carrito no tiene productos"})}
    }
})

routerCarrito.post("/", async(req, res) =>{
    const cart = await carrito.create()
    res.json(cart)
})

routerCarrito.post("/:id/productos/:id_prod", async (req, res) =>{
    if (!Number.isNaN(req.params.id) && !Number.isNaN(req.params.id_prod)) {
        const product = await carrito.newProductInCart(req.params.id, req.params.id_prod)
        if(product != null){res.json(product)}
        else{res.send({error: "No existe un producto con ese id"})}
    }
})

routerCarrito.delete("/:id", async(req, res) => {
    if (!Number.isNaN(req.params.id)) {
        const cart = await carrito.delete(parseInt(req.params.id))
        if(cart != null){res.json(cart)}
        else{res.send({error: "No existe un carrito con ese id"})}
    }
})

routerCarrito.delete("/:id/productos/:id_prod", async(req, res) =>{
    if (!Number.isNaN(req.params.id) && !Number.isNaN(req.params.id_prod)) {
        const product = await carrito.removeProductInCart(req.params.id, req.params.id_prod)
        if(product != null){res.json(product)}
        else{res.send({error: "No existe un producto con ese id"})}
    }else{res.send({error: "Numero de producto o carrito incorrecto"})}
})

module.exports = {routerCarrito}