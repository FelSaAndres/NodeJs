export default class Producto {
	static productos = [];
	constructor() {
		this.id = 0 ;
	}

	getOne(id) {
		let producto = Producto.productos.find((prod) => prod.id == id);
		return producto || { error: "producto no encontrado" };
	}

	getAll() {
		return Producto.productos.length
			? Producto.productos
			: { error: "no hay productos cargados" };
	}

	save(prod) {
		prod.id = ++this.id;
		prod.timeStamp = Date.now();
		Producto.productos.push(prod);
		return prod;
	}

	upload(prod, id) {
		prod.id = Number(id);
		let index = Producto.productos.findIndex((prod) => prod.id == id);
		Producto.productos.splice(index, 1, prod);
	}

	delete(id) {
		let index = Producto.productos.findIndex((prod) => prod.id == id);
		return Producto.productos.splice(index, 1);
	}
}
