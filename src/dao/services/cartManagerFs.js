import fs from 'fs';

export default class CartManager {
    array = new Array();

    constructor (path){
        this.path = path
        if(!fs.existsSync(this.path)){
            fs.writeFileSync(this.path, JSON.stringify(this.array))
        }
    }

    createCart= async() => {
        let carrito = await fs.promises.readFile(this.path, 'utf-8')
        let parsedCart = JSON.parse(carrito)

        let cart = {
            products: []
        }
    
        cart.id = 0
        parsedCart.length === 0 ? (cart.id = 1) : (cart.id = parsedCart[parsedCart.length - 1].id + 1)  
        parsedCart.push(cart)

        await fs.promises.writeFile(this.path, JSON.stringify(parsedCart, null, "\t"))
    }

    cartById = async(requestedId) => {
        
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const carts = JSON.parse(data)

        let Cart = carts.find((el) => el.id === requestedId)
        if(!Cart){return ("El id solicitado no existe")}
        return Cart
    }

    addProductToCart = async(cid, pid, pathProducts) => {
        const dataCarts = await fs.promises.readFile(this.path, 'utf-8')
        const carts = JSON.parse(dataCarts)

        const dataProducts = await fs.promises.readFile(pathProducts, 'utf-8')
        const products = JSON.parse(dataProducts)
        let productById = products.find((el) => el.id === pid)
        
        
        let index = carts.findIndex((el) => el.id === cid)
        
        if( index<0 || !productById) return ("el Producto o el carrito no existe")
        

        let addedProduct = {
            productId: pid,
            quantity: 1
        }
    
        let productIdfound = carts[index].products.find((el) => el.productId === pid)

        if (productIdfound) { 
            productIdfound.quantity ++
        } else{
            carts[index].products.push(addedProduct)
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"))

        return (`Se agrego el producto ${productById.title} al carrito`)
        
    } 

}