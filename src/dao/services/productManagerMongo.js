import productsModel from "../models/products.js"


export default class ProductManager {

    constructor(){
        console.log("trabajando con productManager")
    }

    getAll = async (lim, pag, category, stock, srt) => {
        let limit = lim || 10
        let page = pag || 1
        let sort = srt || {}
        let filter = {} 
        if(category){
            filter.category = { $regex: category, $options: 'i' };
        }
        if (stock) {
            filter.stock = { $gt: 0 }; // Filtrar productos con stock mayor que 0
        }
        let result = await productsModel.paginate(filter,{limit: limit, page: page, sort: sort})

        const response = {
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/api/products?${category ? `category=${category}&` : ''}${stock ? `stock=${stock}&` : ''}limit=${limit}&page=${result.prevPage}&sort=${Object.values(sort).join(',')}` : null,
            nextLink: result.hasNextPage ? `/api/products?${category ? `category=${category}&` : ''}${stock ? `stock=${stock}&` : ''}limit=${limit}&page=${result.nextPage}&sort=${Object.values(sort).join(',')}` : null,
            
        };

        return response;

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