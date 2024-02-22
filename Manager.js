import fs from 'fs';
import express from "express";

export default class ObjManager {
    array = new Array();

    constructor (path){
        this.path = path
        if(!fs.existsSync(this.path)){
            fs.writeFileSync(this.path, JSON.stringify(this.array))
        }
    }


    getObjects = async() => {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const objects = JSON.parse(data)
        return objects
    }

    //la funcion codeValidator permite saber si el codigo ingresado de un nuevo producto ya esta registrado en la base de datos
    codeValidator = async(codeToValidate) => {
        const data = await this.getObjects()
        let result = data.find((el) => el.code === codeToValidate)
        let isValid = false;
        if(!result) {isValid = true}
        return isValid;
    }

    addObject = async(object) => {

        const validCode = await this.codeValidator(object.code)
        if(!validCode){
            console.log("el codigo ingresad ya esta registrado")
        }else{
            const objects = await this.getObjects()            
            object.id = 0
            objects.length === 0 ? (object.id = 1) : (object.id = objects[objects.length - 1].id + 1) 
            objects.push(object)

            await fs.promises.writeFile(this.path, JSON.stringify(objects,  null, "\t"))
            //return res.status(200).send({ status: "OK" })
        }
        return object
    }

    getObjectsById = async(requestedId) => {
        const objects = await this.getObjects()
        let result = objects.find((el) => el.id === requestedId)
        if(!result){console.log("El id solicitado no existe")}
        return result

    }

    deleteObject = async(requestedId ) => {
        const objects = await this.getObjects()
        let result = objects.find((el => el.id === requestedId))
        let i = objects.indexOf(result)
        objects.splice(i,1)

        await fs.promises.writeFile(this.path, JSON.stringify(objects,  null, "\t"))
     
        return console.log(`el objeto con el id ${requestedId} se ha sido eliminado correctamente`)

    }

    updateObject = async(requestedId, updatedObject) => {
        const objects = await this.getObjects()
        let index = objects.findIndex((el) => el.id === requestedId)
        objects[index] = updatedObject
        objects[index].id = requestedId
        await fs.promises.writeFile(this.path, JSON.stringify(objects,  null, "\t"))
        return objects
        
    }
}

// const products = new ProductManager("./productos.json")



// const productsbd = await products.getProducts()
// console.log("TCL: productsbd", productsbd)



// let producto = {
//     title: "cebolla",
//     description: "cebolla",
//     price: 2500,
//     thumbnail: "http://....",
//     code: 99933,
//     stock: 36
// }
// await products.addProduct(producto)



// let newData = {
//     title: "kiwi",
//     description: "kiwi",
//     price: 2500,
//     thumbnail: "http://....",
//     code: 36478,
//     stock: 20
// }
// await products.updateProduct(1, newData)




// await products.deleteProduct(1)



// const result = await products.getProductsById(6)
// console.log(result)




    