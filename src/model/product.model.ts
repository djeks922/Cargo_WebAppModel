import {Schema, model} from 'mongoose'


const ProductSchema  = new Schema({
   name: String,
   category: String,
   barcode: String,
   weight: String,
   identifier: {type: String, unique: true}
})


export default model('product', ProductSchema)