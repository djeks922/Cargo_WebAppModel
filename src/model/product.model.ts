import {Schema, model} from 'mongoose'


const ProductSchema  = new Schema({
   name: String,
   category: String,
   barcode: String,
   weight: String,
   isDeleted: {type:Boolean, default: false},
   identifier: {type: String, unique: true}
},{timestamps: true})
ProductSchema.pre('find', function (this,next) {

      this.where({isDeleted: false}).select({isDeleted:0, __v: 0})
      next()
})
ProductSchema.pre('findOne', function (this,next) {

      this.where({isDeleted: false}).select({isDeleted:0, __v: 0})
      next()
})
ProductSchema.post('save', function(this){
   this.toObject()
})

export default model('product', ProductSchema)