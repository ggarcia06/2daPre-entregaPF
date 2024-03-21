import express from "express";
import {products} from '../src/routes/productsRouter.js'         // fs --para que funcione agregar {productsRouter, }
import cartRouter from '../src/routes/cartRouterMongo.js'        // fs --cambiar el archivo a cartRouter.js
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import { Server } from 'socket.io'
import {viewRouter} from './routes/views.router.js'
import mongoose from "mongoose";
import productsRouter from "./routes/productsRouterMongo.js"
import messagesModel from "../src/dao/models/messages.js"

const connectMongoDB = async ()=>{

    const DB_URL = "mongodb+srv://grmngarcia44:Es0iM0EcTv3BmZXR@cluster0.gb6imdp.mongodb.net/ecommerce?retryWrites=true&w=majority" 
    
    try{
    
        await mongoose.connect(DB_URL)
        console.log("Conectado con Mongoose!")
    
    }catch(error){
        console.error("No se pudo conectar a la DB", error)
        process.exit()
    }
    }
    


const app = express()
const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => console.log("Servidor corriendo en puerto " + PORT))
const io = new Server(server)

connectMongoDB()

io.on('connection', async(socket) => {
    console.log('Usuario conectado');
    // Enviar la lista de productos al usuario recién conectado
    socket.emit('updateProducts', await products.getObjects());
    //esperando recibir mensaje
    socket.on("message", async(data)=> {
       
        await messagesModel.create(data)
        let msg = await messagesModel.find()
        io.emit('messageLogs', msg)
         
    })
});

// // middlewares

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars.engine())


// // Routes

app.use(viewRouter)

app.use("/api/products", productsRouter)

app.use("/api/carts/", cartRouter)

app.use(viewRouter)




export { app, io };
