import express from "express";
import Carrito from "../clases/Carrito.js";

const router = express.Router();

const carrito = new Carrito();

router.post("/", (req, res) => {
	const carritoCreado = carrito.newCarrito();
	res.send(carritoCreado);
});

router.delete("/:id", (req, res) => {
	const carritoBorrado = carrito.delete(req.params.id);
	res.send(carritoBorrado);
});

router.get("/", (req, res) => {
	const listaCarritos = carrito.getAll();
	res.send(listaCarritos);
});

router.post("/:id/productos/:idPrd", (req, res) => {
	const newProductoinCart = carrito.saveProductinCart(
		req.params.idPrd,
		req.params.id
	);
	res.send(newProductoinCart);
});
export default router;
