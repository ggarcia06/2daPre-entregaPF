import express from "express";
import productsRouter from '../routes/productsRouter.js'
import cartRouter from '../routes/cartRouter.js'


const app = express()
const port = 8080

app.listen(port, () => console.log("Servidor corriendo en puerto " + port))

// // middlewares

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

// // Routes

app.use("/api/products/", productsRouter)

app.use("/api/carts/", cartRouter)


