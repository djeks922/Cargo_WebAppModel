import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import { categoryDepo } from "../model/depo.model"
import depoService from '../service/depo.service'


export const createDepo =async (req:Request,res:Response,next: NextFunction) => {
    try {
        const depoInput = req.body
     
        const depo = await depoService.createDepo(depoInput)

        res.send({data: depo})
    } catch (error) {
        next(error)
    }
}
export const getDepo =async (req:Request,res:Response,next: NextFunction) => {
    try {
        const id = req.params.id

        const depo = await depoService.getDepo({id})
        res.send({data: depo})
    } catch (error) {
        next(error)
    }
}
export const getDepos =async (req:Request,res:Response,next: NextFunction) => {
    try {
        const depos = await depoService.getDepos()
        res.send({data: depos})
    } catch (error) {
        next(error)
    }
}
export const deleteDepo =async (req:Request,res:Response,next: NextFunction) => {
    try {
        const id = req.params.id

        const deletedInfo = await depoService.deleteDepo(id)
        
        res.send({data: deletedInfo})
    } catch (error) {
        next(error)
    }
}

/****************** PRODUCT BASED CONTROLLERS */
export const addProductToDepo =async (req:Request,res:Response,next: NextFunction) => {
    try {
        const {depoID,productID}: {depoID: mongoose.Types.ObjectId | categoryDepo, productID: mongoose.Types.ObjectId } = req.params as unknown as any

        const response = await depoService.addProduct(productID,depoID)
        
        res.send({data: response})
    } catch (error) {
        next(error)
    }
}
export const removeProductFromDepo =async (req:Request,res:Response,next: NextFunction) => {
    try {
        const {depoID,productID}: {depoID: mongoose.Types.ObjectId | categoryDepo, productID: mongoose.Types.ObjectId } = req.params as unknown as any
        console.log(depoID,productID)
        const response = await depoService.removeProduct(productID,depoID)
        
        res.send({data: response})
    } catch (error) {
        next(error)
    }
}