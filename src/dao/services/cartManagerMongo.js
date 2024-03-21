import cartsModel from "../models/carts.js"

export default class cartManager {

    constructor(){
        console.log("trabajando con cartManager")
    }

    getCartById = async (id) => {
        let result = await cartsModel.findById(id)
        return result
    }
    createCart = async () => {
        let result = await cartsModel.create({})
        return result
    }
    addProduct = async(cid, pid, quantity) => {
        let cart = await cartsModel.findById(cid)
        let product = cart.products.findById((product) => product.product.toString() === pid)

        if(product) {
            product.quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity})
        }

        return await cart.save()
    }
    deleteProduct = async (cid, pid) => {
        let cart = await cartsModel.findById(cid)
        let product = cart.products.findIndex((product) => product.product.toString() === pid)

        if(product > 0){
            console.log("producto no encontrado")
        }else{
            cart.products.splice(product,1)
        }
        return await cart.save()


    }

}