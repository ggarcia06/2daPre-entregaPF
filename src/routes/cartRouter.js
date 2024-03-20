import { Router } from 'express';
import CartManager from '../dao/services/cartManagerFs.js';

const pathProducts = "./data/productos.json"
const pathCart = "./data/carrito.json"
const cartManager = new CartManager(pathCart)
const cartRouter = Router()
    
// crear carrito
cartRouter.post("/", async(req, res) => {

    await cartManager.createCart()

   return res.status(200).send({ status: "OK" })

})

//GET mostrar productos que pertenezcan al carrito del id seleccionado
cartRouter.get("/:cid/", async(req, res) => {

    let cid = parseInt(req.params.cid)
    let cartById = await cartManager.cartById(cid)
    res.send(cartById)

})

//POST debe agregar un producto al arreglo products del carrito del Id solicitado
cartRouter.post("/:cid/product/:pid/", async(req, res) => {

    let cid = parseInt(req.params.cid)
    let pid = parseInt(req.params.pid)

    let result = await cartManager.addProductToCart(cid,pid, pathProducts)
    return res.status(200).send(result)

})

export default cartRouter