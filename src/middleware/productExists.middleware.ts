
import { NextFunction, Request, Response } from "express"
import productModel from "../model/product.model"

export default async (req:Request,res:Response,next: NextFunction) => {
    try {
        const {productID} = req.params

        const isProduct = await productModel.countDocuments({_id: productID})
        if(isProduct) next()

        throw new Error("Product does not exist");
        
    } catch (error) {
        next(error)
    }
}