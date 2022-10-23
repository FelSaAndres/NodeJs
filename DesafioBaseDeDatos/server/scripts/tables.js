const {options} = require('./mariaDB')
const knex = require('knex')(options)

knex.schema.createTable('productos', (table) => {
    table.increments("id")
    table.string("title", 15)
    table.integer("price")
    table.string("thumbnail")
}).then(() => {
    console.log("The talbe was created")
}).catch((error) => {
    console.log(error)
}).finally(() => {
    knex.destroy()
})
