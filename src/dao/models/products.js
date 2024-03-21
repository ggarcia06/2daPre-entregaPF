import mongoose from 'mongoose';
const { Schema } = mongoose;

const collection = "Products"   // para poder exportarlo como un modulo de nodejs debo aclarar nombre e mi collection 

const schema = new Schema({

    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    thumbnail: {
        type: [String],
        require: true
    },
    code: {
        type: String,
        require: true, 
        unique: true
    },
    price: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        require: true
    }

})

const productsModel = mongoose.model(collection, schema) 

export default productsModel