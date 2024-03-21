import mongoose from 'mongoose';
const { Schema } = mongoose;

const collection = "Messages"

const schema = new Schema({

    user: {
        type: String
    },
    message: {
        type: String
    }
})

const messagesModel = mongoose.model(collection, schema) 

export default messagesModel