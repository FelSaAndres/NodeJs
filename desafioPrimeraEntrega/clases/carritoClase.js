const fs = require('fs')
const { Productos } = require('./productosClase')

class Carrito{
    constructor(){
        this.producto = new Productos()
        this.carrito = []
    }

    async create(){
        try {
            const aux = await this.getAll()
            this.carrito = Array.from(aux)
            let newCart
            if (this.carrito.length) {
                let id = this.carrito[this.carrito.length - 1].id + 1
                newCart = {id: id, timeStamp: Date.now(), productos: []}
                this.carrito.push(newCart)
                fs.promises.writeFile("carrito.txt", JSON.stringify(this.carrito, null, 2))
            }
            else{
                newCart = {id: 1, timeStamp: Date.now(), productos: []}
                this.carrito.push(newCart)
                fs.promises.writeFile("carrito.txt", JSON.stringify(this.carrito, null, 2))

            }
            return newCart
        } catch (error) {console.log(error)}
    }

    async getAll(){
        try {
            if (fs.existsSync("carrito.txt")) {
                const carritos = await fs.promises.readFile("carrito.txt", "utf-8") 
                return JSON.parse(carritos)
            }
            else{fs.writeFileSync("carrito.txt", JSON.stringify(this.carrito, null, 2))}
        } catch (error) {console.log(error)}
    }

    async allProductsInCart(id){
        try {
            const lista = await this.getAll()
            this.carrito = Array.from(lista)
            let lProductos = []
            if (this.carrito.length) {
                let cart = this.carrito.find(x => x.id == id)
                lProductos = cart.productos
            }
            return lProductos
        } catch (error) {console.log(error)}
    }

    async newProductInCart(idCarrito, idProducto){
        try {
            const aux = await this.producto.getAll()
            let listaProductos = Array.from(aux)
            if (listaProductos.length) {
                const aux2 = await this.getAll()
                this.carrito = Array.from(aux2)
                let product = listaProductos.find(x => x.id == idProducto)
                for (let i = 0; i < this.carrito.length; i++) {
                    if (this.carrito[i].id == idCarrito) {
                        this.carrito[i].productos.push(product)
                    }
                }
                fs.promises.writeFile("carrito.txt", JSON.stringify(this.carrito, null, 2))
                return product
            }
        } catch (error) {console.log(error)}
    }

    async removeProductInCart(idCarrito, idProducto){
        try {
            const lista = await this.getAll()
            this.carrito = Array.from(lista)
            if (this.carrito.length) {
                const cart = this.carrito.find(x => x.id == idCarrito)
                let newList = cart.productos.filter(x => x.id != idProducto)
                cart.productos = newList
                fs.promises.writeFile("carrito.txt", JSON.stringify(this.carrito, null, 2))
            }
            return this.producto.getById(idProducto)
        } catch (error) {console.log(error)}
    }

    async delete(id){
        try {
            const lista = await this.getAll()
            let eliminar = Array.from(lista).find(x => x.id == id)
            this.carrito = Array.from(lista).filter(x => x.id != id)
            fs.promises.writeFile("carrito.txt", JSON.stringify(this.carrito, null, 2))
            return eliminar
        } catch (error) {console.log(error)}
    }
}

module.exports = {Carrito}