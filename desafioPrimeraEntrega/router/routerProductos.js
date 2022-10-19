const express = require('express')
const { Productos } = require('../clases/productosClase')
const routerProductos = express.Router()

const productos = new Productos()

function PermisoAdministrador(req, res, next) {
    if (req.query.admin) {
        res.send({ErrorAcceso: "No tiene los permisos para realizar esta accion"})
        next()
    }
    else{
        res.send({ErrorAcceso: "No tiene los permisos para realizar esta accion"})
    }
}

routerProductos.get("/", async(req, res) => {
    const lista = await productos.getAll()
    res.json(lista)
})

routerProductos.post("/", PermisoAdministrador,async(req, res) => {
    let {nombre, precio, imagen, descripcion, stock} = req.body
    const product = await productos.save({nombre, precio, imagen, descripcion, stock})
    console.log(product)
})  

routerProductos.get("/:id", async(req, res) => {
    if (!Number.isNaN(req.params.id)) {
        const product = await productos.getById(parseInt(req.params.id))
        if(product != null){res.json(product)}
        else{res.send({error: "No existe un producto con ese id"})}
    }
})

routerProductos.put("/:id", PermisoAdministrador,async(req, res) => {
    if (!Number.isNaN(req.params.id)) 
    {
        const product = await productos.update(req.body, parseInt(req.params.id))
        res.json(product)
    }else{res.json({error : "Numero de id incorrecto"})}
})

routerProductos.delete("/:id", PermisoAdministrador,async(req, res) => {
    if (!Number.isNaN(req.params.id)) {
        const product = await productos.delete(parseInt(req.params.id))
        res.json(product)
    }else{res.json({error : "Numero de id incorrecto"})}
})

module.exports = {routerProductos}
