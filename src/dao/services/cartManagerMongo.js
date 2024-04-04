import cartsModel from "../models/carts.js"
import productsModel from "../models/products.js"

export default class cartManager {

    constructor(){
        console.log("trabajando con cartManager")
    }

    getCartById = async (id) => {
        let result = await cartsModel.findOne({_id:id})
        return result
    }
    createCart = async () => {
        let result = await cartsModel.create({})
        return result
    }
    addProduct = async(cid, pid, quantity) => {
        let cart = await cartsModel.findById(cid)
        if (!cart){ throw new Error("el carrito no existe")}
        let product = await productsModel.findById(pid)
        if (!product){ throw new Error("el producto no existe")}
        
        let productIndex = cart.products.findIndex((el) => el.product.toString() === pid)

        if(productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity})
        }

        return await cart.save()
    }
    deleteProduct = async (cid, pid) => {
        let cart = await cartsModel.findById(cid)
        if (!cart){ throw new Error("el carrito no existe")}
        let product = await productsModel.findById(pid)
        if (!product){ throw new Error("el producto no existe")}

        let result = await cartsModel.updateOne({_id: cid}, {$pull: {products: {product:pid}}})
        return result

    }

}