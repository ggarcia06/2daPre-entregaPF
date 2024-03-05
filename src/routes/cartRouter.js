import { Router } from 'express';
//import ObjManager from "../Manager.js";
import fs from 'fs';
import { products, carts, pathCart } from '../app.js';

const cartRouter = Router()
// const pathCart = "./data/carrito.json"
// const carts = new ObjManager(pathCart)
// const pathProducts = "./data/productos.json"
// const products = new ObjManager(pathProducts)

    // crear carrito

cartRouter.post("/", async(req, res) => {

    let carrito = await fs.promises.readFile(pathCart, 'utf-8')
    let parsedCart = JSON.parse(carrito)

    let cart = {
        products: []
    }
    
    cart.id = 0
    parsedCart.length === 0 ? (cart.id = 1) : (cart.id = parsedCart[parsedCart.length - 1].id + 1)  
     parsedCart.push(cart)

    await fs.promises.writeFile(pathCart, JSON.stringify(parsedCart, null, "\t"))

   return res.status(200).send({ status: "OK" })

})

     //GET mostrar productos que pertenezcan al carrito del id seleccionado

cartRouter.get("/:cid/", async(req, res) => {

    let cid = parseInt(req.params.cid)

    let cartById = await carts.getObjectsById(cid)

    if (!cartById) {
        return res.status(400).send({ status: "error" });
    }
    
   res.send(cartById)

})

    //POST debe agregar un producto al arreglo products del carrito del Id solicitado

cartRouter.post("/:cid/product/:pid/", async(req, res) => {

    let cid = parseInt(req.params.cid)
    let pid = parseInt(req.params.pid)

    let productById = await products.getObjectsById(pid)
    const carrito = await carts.getObjects()  

    let index = carrito.findIndex((el) => el.id === cid)

    if( index<0 || !productById) return res.status(400).send({ status: "error" })

    let addedProduct = {
        productId: pid,
        quantity: 1
    }
    
    let productIdfound = carrito[index].products.find((el) => el.productId === pid)

    if (productIdfound) { 
        productIdfound.quantity ++
        } else{
        carrito[index].products.push(addedProduct)
    }

    await fs.promises.writeFile(pathCart, JSON.stringify(carrito, null, "\t"))
 
    return res.status(200).send({ status: "OK" })

})

export default cartRouter