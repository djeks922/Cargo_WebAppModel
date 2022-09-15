import { NextFunction, Request, Response } from "express"
import { categoryDepo } from "../model/depo.model"
import Product, { ProductStatusEnum } from "../model/product.model"
import {addProduct} from '../service/depo.service'

export const createProduct =async (req:Request,res:Response,next: NextFunction) => {
    try {
        const productInput = req.body
    
        const product = await Product.create(productInput)

        const depoResponse = await addProduct(product._id, categoryDepo.TR)
        console.log(depoResponse)

        res.send({data: product, message: depoResponse})
    } catch (error) {
        next(error)
    }
}
export const getProduct =async (req:Request,res:Response,next: NextFunction) => {
    try {
        const id = req.params.id

        const product = await Product.findById(id)
        if(!product) return res.send({data: null})
        res.send({data: product})
    } catch (error) {
        next(error)
    }
}
export const getProducts =async (req:Request,res:Response,next: NextFunction) => {
    try {
        const products = await Product.find().where({isDeleted: true})
        res.send({data: products})
    } catch (error) {
        next(error)
    }
}
export const deleteProduct =async (req:Request,res:Response,next: NextFunction) => {
    try {
        const id = req.params.id

        const deleted = await Product.findOneAndUpdate({_id:id, status: {$nin: [ProductStatusEnum.inPlane]}, isDeleted: false}, {$set: {isDeleted: true}}, {rawResult: true})
        console.log(deleted)
        if(!deleted.lastErrorObject?.updatedExisting) return res.status(401).send({message: 'Product possible in flight or Already deleted. Could not be deleted!'})
    
        res.send({data: 'Succesfully deleted'})
    } catch (error) {
        next(error)
    }
}