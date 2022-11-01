const express = require('express')
const { ProductoDAO } = require('../DAOs/productoDAO')
const routerProductos = express.Router()

const product = new ProductoDAO()

function PermisoAdministrador(req, res, next) {
    if (req.query.admin) {
        next()
    }
    else{
        res.send({ErrorAcceso: "No tiene los permisos para realizar esta accion"})
    }
}

routerProductos.get("/", async(req, res) => {
    const lista = await product.getAll()
    res.json(lista)
})

routerProductos.post("/", PermisoAdministrador,async(req, res) => {
    const newProduct = await product.create(req.body)
    if(newProduct != null){ res.json({Awesome: "Nuevo producto ingresado"})}
})  

routerProductos.get("/:id", async(req, res) => {
    if (!Number.isNaN(req.params.id)) {
        const productID = await product.getById(req.params.id)
        if(productID != null){res.json(productID)}
        else{res.send({error: "No existe un producto con ese id"})}
    }
})

routerProductos.put("/:id", PermisoAdministrador, async(req, res) => {
    if (!Number.isNaN(req.params.id)) 
    {
        const productUP = await product.update(req.body, req.params.id)
        res.json(productUP)
    }else{res.json({error : "Numero de id incorrecto"})}
})

routerProductos.delete("/:id", PermisoAdministrador,async(req, res) => {
    if (!Number.isNaN(req.params.id)) {
        const products = await product.delete(req.params.id)
        res.json(products)
    }else{res.json({error : "Numero de id incorrecto"})}
})

module.exports = {routerProductos}
