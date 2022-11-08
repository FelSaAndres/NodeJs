const {faker} = require('@faker-js/faker')

function generarProducto() {
    return{
        nombre: faker.commerce.productName(),
        precio: faker.commerce.price(),
        thumbnail: faker.image.technics(),
    }
}

module.exports = {generarProducto}