import express from "express";
import fs, { write } from "fs";
import UUID from "node:crypto"

const app = express()
const port = 8080
const pathCart = "./data/carrito.json"
const pathProducts = "./data/productos.json"

app.listen(port, () => console.log("Servidor corriendo en puerto " + port))

app.use(express.json())


//----------------------------------------Productos------------------------------
app.get("/api/products/", async(req,res) => {

//GET todos los productos
const data = await fs.readFileSync(pathProducts, "utf-8")
const products = JSON.parse(data)
let limit = parseInt(req.query.limit) || products.length
const finalProducts = products.slice(0,limit)
res.send (finalProducts)

})

app.get("/api/products/:pid/", async(req, res) => {

    //GET el producto segun su id
    const data = await fs.readFileSync(pathProducts, "utf-8")
    const products = JSON.parse(data)
    let pid = parseInt(req.params.pid)
    let result = products.find((el) => el.id === pid)
    if(!result){res.send("El id solicitado no existe")}
    res.send(result)
})

app.post("/api/products/", async(req, res) => {

    //POST crear nuevo producto
    const data = await fs.readFileSync(pathProducts, "utf-8")
    const products = JSON.parse(data)
    let product = req.body

    product.status = true
    product.id = 0
    products.length === 0 ? (product.id = 1) : (product.id = products[products.length - 1].id + 1)
    if (!product.title || !product.description  || !product.price || !product.code || !product.stock || !product.category) {
        return res.status(400).send({ status: "error" });
      }
    
      products.push(product);
      await fs.writeFileSync(pathProducts, JSON.stringify(products,  null, "\t"))
      return res.status(200).send("Producto agregado correctamente")
    

})

app.put("/api/products/:pid/", () => {

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