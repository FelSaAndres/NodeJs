import express from "express";
import Producto from "../clases/Producto.js";

const router = express.Router();

const producto = new Producto();

/*unction validarAdmin(req, res, next) {
	if (req.query.admin) {
		next();
	} else {
		res.send("usted no tiene acceso");
	}
}*/

router.post("/", (req, res) => {
	console.log(req.body);
	const newProducto = producto.save(req.body);
	res.send(newProducto);
});

router.delete("/:id", (req, res) => {
	const deleteProducto = producto.delete(req.params.id);
	res.send(deleteProducto);
});

router.get("/", (req, res) => {
	const listaProductos = producto.getAll();
	res.send(listaProductos);
});

router.get("/:id", (req, res) => {
	const oneProducto = producto.getOne(req.params.id);
	res.send(oneProducto);
});

export default router;
