import { Router } from 'express';
import ObjManager from "../Manager.js";
import { products } from '../app.js';

const viewRouter = Router();

viewRouter.get('/', async(req, res) => {
    const data = await products.getObjects()
    res.render('home', {productos: data} )
})

export default viewRouter;