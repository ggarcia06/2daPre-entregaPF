import ProductManager from "../dao/services/productManagerMongo.js"
import express from 'express'

const productManager = new ProductManager()
const router = express.Router()

router.get("/", async(req, res)=>{ 
    
    try {
        let limit = parseInt(req.query.limit)
        let page = parseInt(req.query.page)
        let query = req.query.query
        let sort = req.query.sort ? { price: parseInt(req.query.sort) } : {};
        let data = await productManager.getAll(limit, page, query, sort)
        res.json({data})
    }catch(error){
        console.error("Error al obtener todos los productos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }

})

router.post("/", async(req, res)=>{ 
   try{
    //const {title,description,category, thumbnail,code,price, stock, status} = req.body 
    const newProduct = req.body

    let result = await productManager.addProduct(newProduct)
    
    res.json({result})
    } catch(error){
        console.error("Error al cargar nuevo producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
})

router.get("/:pid/", async(req, res) => {
    try{
    let pid = req.params.pid
    let result = await productManager.getById(pid)
    res.json({result})
}catch(error){
    console.error("Error al obtener el id solicitado", error);
        res.status(500).json({ error: "Error interno del servidor" });
}
})

router.put("/:pid", async(req, res) =>{
    try{
        let pid = req.params.pid
        let updatedProduct = req.body
        let result = await productManager.updateProduct(pid, updatedProduct)
        res.json({result})
    }catch(error){
        console.error("Error al editar producto", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
})

router.delete("/:pid", async(req, res) => {
   try {let pid = req.params.pid
    let product = await productManager.getById(pid)
    await productManager.deleteProduct(pid)
    res.send(`Se elimino el producto ${product.title} de la base de datos`)
}catch(error){
    console.error("Error al eliminar producto", error);
        res.status(500).json({ error: "Error interno del servidor" });
}
})

export default router
