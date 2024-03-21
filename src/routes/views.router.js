import { Router } from 'express';

import { products } from '../routes/productsRouter.js';            //fs


const viewRouter = Router();


viewRouter.get('/', async(req, res) => {
    const data = await products.getObjects()
    res.render('home', {productos: data} )
})

viewRouter.get('/realtimeproducts', async(req, res) => {
    const data = await products.getObjects()
    res.render('realtimeproducts', {productos: data} )
})

viewRouter.get('/chat',(req,res)=>{
    res.render('chat');
})




export { viewRouter};