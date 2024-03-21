import CartManager from "../dao/services/cartManagerMongo.js"
import express from 'express'

const cartManager = new CartManager()
const router = express.Router()

router.post("/", async(req, res)=>{

    try{
        let result = await cartManager.createCart()
        res.json({result})
    }catch(error){
        console.error("Error al crear carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
})

router.get("/:cid", async(req, res)=>{
    try{
        let cid = req.params.cid
        let result = await cartManager.getCartById(cid)
        res.json({result})
    }catch(error){
        res.status(500).json({ error: "Error interno del servidor" });
    }
})

router.post("/:cid/product/:pid/", async(req, res) => {
    try{
        let cid = req.params.cid
        let pid = req.params.pid
        let result = await cartManager.addProduct(cid, pid, 1)
        res.json({result})
    }catch(error){
        res.status(500).json({ error: "Error interno del servidor" });
    }
})

router.delete("/:cid/delete/:pid/", async(req, res) =>{
    try{
        let cid = req.params.cid
        let pid = req.params.pid
        let result = await cartManager.deleteProduct(cid, pid)
        res.json({result})
    }catch(error){
        res.status(500).json({ error: "Error interno del servidor" });
    }
})


export default router