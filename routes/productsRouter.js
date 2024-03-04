import { Router } from 'express';
import ObjManager from "../src/Manager.js";

const productsRouter = Router()
const pathProducts = "./data/productos.json"
const products = new ObjManager(pathProducts)

// mostrar todos los productos de la base de datos

productsRouter.get("/", async(req,res) => {

    const productsdb = await products.getObjects()
    let limit = req.query.limit || productsdb.length
    const finalProducts = productsdb.slice(0,limit)
    res.send (finalProducts)

})

// mostrar producto segun id

productsRouter.get("/:pid/", async(req, res) => {

    let pid = parseInt(req.params.pid)
    const result = await products.getObjectsById(pid)
    if (!result) {
        return res.status(400).send({ status: "error" });
    }
    res.send(result)

})

// agregar un producto a la base de datos

productsRouter.post("/", async(req, res) => {

    let product = req.body
    product.status = true
    const validCode = await products.codeValidator(product.code)
   // si hay un campo vacio o el codigo ya existe en los productos de la base de datos envia error
    if (!product.title || !product.description  || !product.price || !product.code || !product.stock || !product.category || !validCode) {
        return res.status(400).send({ status: "error" });
      }
    await products.addObject(product)
    return res.status(200).send({ status: "OK" })
    
})

//PUT editar un producto segun su id

productsRouter.put("/:pid/", async(req, res) => {

    let pid = parseInt(req.params.pid)
    let newData = req.body
    // Para poder actualizar el producto todos los campos deben estar completos
    if (!newData.title || !newData.description  || !newData.price || !newData.code || !newData.stock || !newData.category) {
        return res.status(400).send({ status: "error" });
      }
    newData.status = true
    await products.updateObject(pid, newData)
    return res.status(200).send({ status: "OK" })

})

productsRouter.delete("/:pid/", async(req, res) => {
    
    //DELETE borrar un producto segun su id

    let pid = parseInt(req.params.pid)
    let  result = await products.getObjectsById(pid)
    if (!result) {
        return res.status(400).send({ status: "error" });
    }
    
    await products.deleteObject(pid)
    return res.status(200).send({ status: "OK" })

})

export default productsRouter