const {options} = require('./server/scripts/mariaDB')
const knex = require('knex')(options)

class Producto{
    constructor(){
        this.listaproductos = []
    }

    async save(newProduct){
        try {
            if (newProduct.title && !Number.isNaN(newProduct.price) && newProduct.thumbnail) {
                await knex('productos').insert(newProduct)
            }
            else{console.log("Error en el formato de producto")}
            return newProduct
        } catch (error) {console.log(error)}
    }

    async getAll(){
        try {
            let aux = await knex('productos').select('*')
            this.listaproductos = JSON.parse(JSON.stringify(aux))
            //for(let row of aux){this.listaproductos.push({id: row['id'], title: row['title'], price: row['price'], thumbnail: row['thumbnail']})}
            return this.listaproductos
        } catch (error) {console.log(error)}
    }
}

module.exports = {Producto}