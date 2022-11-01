const mongoose = require('mongoose')
const { productoMODEL } = require('../models/productosMODEL')
const { carritoMODEL } = require('../models/carritosMODEL')

class CarritoDAO{
    constructor(){
        this.path = "mongodb+srv://proyectonode:proyectonode@cluster0.cynne3g.mongodb.net/?retryWrites=true&w=majority"
        this.mongodb = mongoose.connect
        this.producto = new productoMODEL()
        this.carritos = []
    }

    async create(){
        try {
            await this.mongodb(this.path)
            const desing = { timeStampt: Date.now(), productos: []}
            const cart = new carritoMODEL(desing)
            return await cart.save()
        } catch (error) {console.log(error)}
    }

    async getAll(){
        try {
            await this.mongodb(this.path)
            const carritos = await carritoMODEL.find({})
            return carritos
        } catch (error) {console.log(error)}
    }

    async allProductsInCart(id){
        try {
            await this.mongodb(this.path)
            const cart = await carritoMODEL.find({})
            return cart.productos 
        } catch (error) {console.log()}
    }
    
    async newProductInCart(carritoID, productoID){
        try {
            await this.mongodb(this.path)
            const lProductos = await productoMODEL.findOne({_id: productoID})
            const lCarrito = await carritoMODEL.findOne({_id: carritoID})
            const newList = lCarrito.productos
            newList.push(lProductos)
            return await carritoMODEL.updateOne({_id: carritoID}, {$set: {productos: newList}})
        } catch (error) {console.log(error)}
    }

    async delete(carritoID){
        try {
            await this.mongodb(this.path)
            return await carritoMODEL.findByIdAndDelete(carritoID)
        } catch (error) {console.log(error)}
    }

    async removeProductInCart(carritoID, productoID){
        try {
            await this.mongodb(this.path)
            const lProductos = await productoMODEL.findOne({_id: productoID})
            const lCarrito = await carritoMODEL.findOne({_id: carritoID})
            const newList = lCarrito.productos.filter(x => x._id != productoID)
            return await carritoMODEL.updateOne({_id: carritoID}, {$set: {productos: newList}})
        } catch (error) {console.log(error)}
    }

}

module.exports = {CarritoDAO}