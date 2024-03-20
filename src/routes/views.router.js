import { Router } from 'express';
//import ObjManager from "../dao/services/productManagerFs.js";
import { products } from '../routes/productsRouter.js';


const viewRouter = Router();


viewRouter.get('/', async(req, res) => {
    const data = await products.getObjects()
    res.render('home', {productos: data} )
})

viewRouter.get('/realtimeproducts', async(req, res) => {
    const data = await products.getObjects()
    res.render('realtimeproducts', {productos: data} )
})



export { viewRouter};