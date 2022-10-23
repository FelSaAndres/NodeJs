const knex = require('knex')({
    client: 'sqlite3',
    connection: {filename: "../DB/myDB.sqlite"},
    useNullAsDefault: true
})

knex.schema.createTable('mensajes', (table) => {
    table.string("nick")
    table.string("mensaje")
    table.string("fecha")
}).then(() => {
    console.log("The talbe was created")
}).catch((error) => {
    console.log(error)
}).finally(() => {
    knex.destroy()
})