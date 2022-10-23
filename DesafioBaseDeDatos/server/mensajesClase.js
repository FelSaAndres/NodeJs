const knex = require('knex')({
    client: 'sqlite3',
    connection: {filename: "./DB/myDB.sqlite"},
    useNullAsDefault: true
})

class Mensajes{
    async save(newMensaje){
        try {
            await knex('mensajes').insert(newMensaje)
            return newMensaje
        } catch (error) {console.log(error)}
    }

    async getAll(){
        try {
            let aux = await knex('mensajes').select('*')
            console.log(aux)
            return aux
        } catch (error) {console.log(error)}
    }
}

module.exports = {Mensajes}