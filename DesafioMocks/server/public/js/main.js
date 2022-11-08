const socket = io.connect()
const {Mensajes} = require('../')

socket.on("productos", (data) =>{
    render(data)
})

socket.on("mensajes", (data) =>{
    renderMensaje(data)
})

function render(data) {
    const html = data.map((producto) => {
        return `<div class"card" style="width: 15rem;">
            <img src=${producto.thumbnail} class="card-img-top" alt=${producto.title} style="width: 13rem; height: 13rem">
            <div class="card-body">
                <h3>${producto.nombre}</h3>
                <span>$${producto.precio}</span>
            </div>
        </div>`
    }).join(" ")
    document.getElementById("productos").innerHTML = html
}

function addProducto() {
    const newProducto = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        thumbnail: document.getElementById("foto").value
    }

    document.getElementById("nombre").value = ""
    document.getElementById("precio").value = ""
    document.getElementById("foto").value = ""

    socket.emit("new-product", newProducto)
}

const input = document.getElementById("message")
document.getElementById("btnMensaje").addEventListener("click", () => {
    socket.emit("mensaje", input.value)
})


function renderMensaje(data) {
    const html = data.map((elemnt) =>{
       return `
                <span style="color: blue"><strong>${elemnt.author.id}</strong></span>
                <span style="color: brown">[${elemnt.fecha}]</span>
                <span style="color: green; font: italic;">${elemnt.text}</span>
              `
    }).join("<br>")
    
    document.getElementById("chatMessages").innerHTML = html
}

function addMessage() {
    const mensaje = {
        author: {
            email: document.getElementById('email').value,
            nombre: document.getElementById("nick").value,
            apellido: document.getElementById('surname').value,
            edad: document.getElementById('age').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value,
        },
        text: document.getElementById("message").value 
    }
    console.log(mensaje)
    document.getElementById("email").value = ""
    document.getElementById("nick").value = ""
    document.getElementById("surname").value = ""
    document.getElementById("age").value = ""
    document.getElementById("alias").value = ""
    document.getElementById("avatar").value = ""
    document.getElementById("message").value = ""

    socket.emit("new-mensaje", mensaje)

    return false
}