const mongoose = require('mongoose')

const carritoSchema = {
    carrito: String,
    timeStampt: Date,
    productos: Array,
}

const carritoMODEL = mongoose.model('carrito', carritoSchema)
module.exports = {carritoMODEL}