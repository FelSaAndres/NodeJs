const {generarProducto} = require('./faker')

class Producto{
    constructor(){
        this.listaproductos = []
    }

    async getAllTest(){
        try {
            for (let i = 0; i < 5; i++) {
                this.listaproductos.push(generarProducto())
            }
            return this.listaproductos
        } catch (error) {console.log(error)}
    }
}

module.exports = {Producto}