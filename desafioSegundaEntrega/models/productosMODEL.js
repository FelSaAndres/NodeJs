const mongoose = require('mongoose')

const productosSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    imagen: String,
    descripcion: String,
    stock: Number,
    timeStamp: Date,
})

const productoMODEL = mongoose.model('producto', productosSchema)

module.exports = {productoMODEL}