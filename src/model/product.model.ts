import { Schema, model, Document, ModifyResult } from "mongoose";
import { categoryDepo } from "./depo.model";

export enum ProductStatusEnum {
      idle = 'IDLE',
      inDepoTR = 'INDEPO_TR',
      inDepoAZ = 'INDEPO_AZ',
      inPlane = 'INFLIGHT'
}
interface Product {
      name: string,
      category: string,
      barcode: string,
      weight: string,
      status: ProductStatusEnum
      isDeleted: boolean
      identifier: string
}

const ProductSchema = new Schema(
  {
    name: String,
    category: String,
    barcode: String,
    weight: String,
    status: {type: String, enum: ProductStatusEnum, default: ProductStatusEnum.inDepoTR},
    isDeleted: { type: Boolean, default: false },
    identifier: { type: String, unique: true },
  },
  { timestamps: true }
);
ProductSchema.pre("find", function (this, next) {
  this.where({ isDeleted: false }).select({ isDeleted: 0, __v: 0 });
  next();
});
ProductSchema.pre("findOne", function (this, next) {
  this.where({ isDeleted: false }).select({ isDeleted: 0, __v: 0 });
  next();
});
 


ProductSchema.post("findOneAndUpdate", async function (this,doc: ModifyResult<Product>) {
      if(doc.lastErrorObject?.updatedExisting){
            console.log('deleted, post hook')
            if(doc.value?.status === ProductStatusEnum.inDepoTR){
                  console.log(doc.value._id)
                  const result = await model('depo').findOneAndUpdate({category: categoryDepo.TR}, {$pull: {products: doc.value._id},$push: {products_archive: doc.value._id}})
                  console.log(result)
            }
            if(doc.value?.status === ProductStatusEnum.inDepoAZ){
                  const result = await model('depo').findOneAndUpdate({category: categoryDepo.AZ}, {$pull: {products: doc.value._id},$push: {products_archive: doc.value._id}})
                  console.log(result)
            }
      }
});

export default model("product", ProductSchema);
