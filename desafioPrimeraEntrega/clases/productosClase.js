const fs = require('fs')

class Productos{
    constructor(){
        this.listaproductos = []
    }
    async save(newProducto){
        try {
            const aux = await this.getAll()
            let lista = Array.from(aux)
            let id = lista[lista.length - 1].id + 1
            const timeStamp = Date.now()
            const product = {
                nombre: newProducto.nombre,
                precio: newProducto.precio,
                imagen: newProducto.imagen,
                descripcion: newProducto.descripcion,
                stock: newProducto.stock,
                timeStamp,
                id
            }

            lista = [...lista, product]
            this.listaproductos = lista
            fs.promises.writeFile("productos.txt", JSON.stringify(this.listaproductos, null, 2))
            return product
            
        } catch (error) {console.log(error)}
    }

    async getAll(){
        try {
            if(fs.existsSync("productos.txt")){
                let lista = await fs.promises.readFile("productos.txt", "utf-8")
                return JSON.parse(lista)
            }
            else{
                fs.writeFileSync("productos.txt", JSON.stringify([], null, 2));
            }
        } catch (error) {console.log(error)}
    }

    async getById(id){
        try {
            const aux = await this.getAll()
            const lista = Array.from(aux)
            return lista.find(x => x.id == id)
        } catch (error) {console.log(error)}
    }

    async update(product, id){
        try {
            let prod
            const aux = await this.getAll()
            this.listaproductos = Array.from(aux)
            let {nombre, precio, imagen, descripcion, stock} = product
            for (let i = 0; i < this.listaproductos.length; i++) {
                if(this.listaproductos[i].id == id){
                    this.listaproductos[i].nombre = nombre
                    this.listaproductos[i].precio = precio
                    this.listaproductos[i].imagen = imagen
                    this.listaproductos[i].descripcion = descripcion
                    this.listaproductos[i].stock = stock
                    prod = this.listaproductos[i]
                }
            }
            fs.promises.writeFile("productos.txt", JSON.stringify(this.listaproductos, null, 2))
            return prod
        } catch (error) {console.log(error)}
    }

    async delete(id){
        try {
            const aux = await this.getAll()
            this.listaproductos = Array.from(aux)
            let product = this.listaproductos.find(x => x.id == id)
            this.listaproductos = this.listaproductos.filter(x => x.id != id)
            fs.promises.writeFile("productos.txt", JSON.stringify(this.listaproductos, null, 2))
            return product
        } catch (error) {console.log(error)}
    }
}

module.exports = {Productos}