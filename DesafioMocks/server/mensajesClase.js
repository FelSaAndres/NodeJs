const fs = require('fs')

class Mensajes{
    async save(newMensaje){
        try {
            let aux = await this.getAll()
            let lista = Array.from(aux)
            lista.push(newMensaje)
            fs.promises.writeFile("mensajes.txt", JSON.stringify(lista, null, 2), "utf-8")
        } catch (error) {console.log(error)}
    }

    async getAll(){
        try {
            if (fs.existsSync("mensajes.txt")) {
                let lista = await fs.promises.readFile("mensajes.txt", "utf-8")
                return JSON.parse(lista)
            }
            else{ fs.promises.writeFile("mensajes.txt", JSON.stringify([], null, 2))}
        } catch (error) {console.log(error)}
    }
}

module.exports = {Mensajes}