import productsModel from "../models/products.js"

export default class ProductManager {

    constructor(){
        console.log("trabajando con productManager")
    }

    getAll = async (lim, pag, query, srt) => {
        let limit = lim || 10
        let page = pag || 1
        let sort = srt || {}
        let search = query 
        let result = await productsModel.paginate({},{limit: limit, page: page, sort: sort})
        return result

    }
    getById = async (id) => {
        let result = await productsModel.findById(id)
        return result
    }
    addProduct = async (product) => {
        let result = await productsModel.create(product)
        return result
    }
    updateProduct = async(id, productData) => {
        let result = await productsModel.updateOne({_id:id}, { $set: productData})
        return result
    }
    deleteProduct = async (id) => {
        let result = await productsModel.deleteOne({_id:id})
        return result
    }

}