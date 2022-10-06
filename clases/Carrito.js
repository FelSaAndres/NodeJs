import Producto from "./Producto.js";

export default class Carrito {
	constructor() {
		this.producto = new Producto();
		this.carritos = [];
		this.id = 1;
	}

	getOne(id) {
		let prod = this.carritos.find((carr) => carr.id == id);
		return prod || { error: "carrito no encontrado" };
	}

	getAll() {
		return this.carritos.length
			? this.carritos
			: { error: "no hay carritos cargados" };
	}

	newCarrito() {
		const carr = { id: this.id++, timeStamp: Date.now(), productos: [] };
		this.carritos.push(carr);
		return carr;
	}

	saveProductinCart(idProd, idCarrito) {
		console.log(idProd);
		const producto = this.producto.listar(idProd);
		this.carritos.forEach((carro) => {
			carro.id == idCarrito ? carro.productos.push(producto) : null;
		});
		return this.carritos;
	}

	upload(carr, id) {
		carr.id = Number(id);
		let index = this.carritos.findIndex((carr) => carr.id == id);
		this.productos.splice(index, 1, carr);
	}

	delete(id) {
		let index = this.carritos.findIndex((carr) => carr.id == id);
		return this.carritos.splice(index, 1);
	}
}
