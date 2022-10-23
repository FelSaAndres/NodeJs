const socket = io.connect()

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
                <h3>${producto.title}</h3>
                <span>$${producto.price}</span>
            </div>
        </div>`
    }).join(" ")
    document.getElementById("productos").innerHTML = html
}

function addProducto(producto) {
    const newProducto = {
        title: document.getElementById("nombre").value,
        price: document.getElementById("precio").value,
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
                <span style="color: blue"><strong>${elemnt.nick}</strong></span>
                <span style="color: brown">${elemnt.fecha}</span>
                <span style="color: green; font: italic;">${elemnt.mensaje}</span>
              `
    }).join("<br>")
    
    document.getElementById("chatMessages").innerHTML = html
}

function addMessage(data) {
    const mensaje = {
        nick: document.getElementById("nick").value,
        mensaje: document.getElementById("message").value
    }
    document.getElementById("nick").value = ""
    document.getElementById("message").value = ""

    socket.emit("new-mensaje", mensaje)

    return false
}