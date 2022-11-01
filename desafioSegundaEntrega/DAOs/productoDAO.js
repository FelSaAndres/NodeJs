const mongoose = require('mongoose')
const { productoMODEL } = require('../models/productosMODEL')

class ProductoDAO{
    constructor(){
        this.path = "mongodb+srv://proyectonode:proyectonode@cluster0.cynne3g.mongodb.net/?retryWrites=true&w=majority"
        this.mongodb = mongoose.connect
    }

    async create(product){
        try {
            await this.mongodb(this.path)
            let timeStamp = Date.now()
            const aux = {
                nombre: product.nombre,
                precio: product.precio,
                imagen: product.imagen,
                descripcion: product.descripcion,
                stock: product.stock,
                timeStamp
            }
            console.log(aux)
            const newProduct = new productoMODEL(aux)
            return await newProduct.save()
        } catch (error) {console.log(error)}
    }

    async getAll(){
        try {
            await this.mongodb(this.path)
            const lista = await productoMODEL.find({})
            return lista
        } catch (error) {console.log(error)}
    }

    async getById(id){
        try {
            await this.mongodb(this.path)
            const product = await productoMODEL.findById(id)
            return product
        } catch (error) {console.log(error)}
    }

    async delete(id){
        try {
            await this.mongodb(this.path)
            await productoMODEL.findByIdAndDelete(id)
        } catch (error) {console.log(error)}
    }

    async update(prod, id){
        try {
            await this.mongodb(this.path)
            return await productoMODEL.findByIdAndUpdate(id, prod)
        } catch (error) {console.log(error)}
    }
}

module.exports = {ProductoDAO}