const express = require('express')
const routerCarrito = express.Router()
const { CarritoDAO } = require('../DAOs/carritoDAO')
const { ProductoDAO } = require('../DAOs/productoDAO')

const producto = new ProductoDAO()
const carrito = new CarritoDAO()

routerCarrito.get("/:id", async(req, res) => {
    if (!Number.isNaN(req.params.id)) {
        const products = await carrito.allProductsInCart(parseInt(req.params.id))
        if(products != null){res.json(products)}
        else{res.send({error: "Este carrito no tiene productos"})}
    }
})

routerCarrito.get("/", async(req, res) =>{
    const cart = await carrito.getAll(req.params.id)
    res.json(cart)
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
        const cart = await carrito.delete(req.params.id)
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