import express from "express";
import fs, { write } from "fs";
import UUID from "node:crypto"
import Manager from "./Manager.js";
import ObjManager from "./Manager.js";

const app = express()
const port = 8080
const pathCart = "./data/carrito.json"
const pathProducts = "./data/productos.json"
const products = new ObjManager("./productos.json")

app.listen(port, () => console.log("Servidor corriendo en puerto " + port))

app.use(express.json())


//----------------------------------------Productos------------------------------
app.get("/api/products/", async(req,res) => {

    const productsdb = await products.getObjects()
    let limit = parseInt(req.query.limit) || productsdb.length
    const finalProducts = productsdb.slice(0,limit)
    res.send (finalProducts)

})

app.get("/api/products/:pid/", async(req, res) => {

    let pid = parseInt(req.params.pid)
    const result = await products.getObjectsById(pid)
    res.send(result)

})

app.post("/api/products/", async(req, res) => {

    let product = req.body
   product.status = true
    if (!product.title || !product.description  || !product.price || !product.code || !product.stock || !product.category) {
        return res.status(400).send({ status: "error" });
      }
    await products.addObject(product)
    return res.status(200).send({ status: "OK" })
    
})

app.put("/api/products/:pid/", async(req, res) => {

    let pid = parseInt(req.params.pid)
    let newData = req.body
    // Para poder actualizar el producto todos los campos deben estar completos
    if (!newData.title || !newData.description  || !newData.price || !newData.code || !newData.stock || !newData.category) {
        return res.status(400).send({ status: "error" });
      }
    newData.status = true
    await products.updateObject(pid, newData)
    return res.status(200).send({ status: "OK" })
    //PUT editar un producto segun su id

})

app.delete("/api/products/:pid/", () => {


    //DELETE borrar un producto segun su id

})


//---------------------------------------Carrito------------------------------

app.post("/api/carts/", () => {

//     fs.readFileSync(pathCart, "utf-8")
//    const ID = randomUUID()

//    let cart = {
//     id: ID,
//     products: []
//    }
})

app.get("/api/carts/:cid/", () => {

    //GET mostrar productos que pertenezcan al carrito del id seleccionado

})

app.post("/api/carts/:cid/product/:pid/", () => {

    //POST debe agregar un producto al arreglo products del Id solicitado

})