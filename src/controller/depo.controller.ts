import { NextFunction, Request, Response } from "express"
import Depo from "../model/depo.model"


export const createDepo =async (req:Request,res:Response,next: NextFunction) => {
    try {
        const depoInput = req.body
     
        const depo = await Depo.create(depoInput)

        res.send({data: depo})
    } catch (error) {
        next(error)
    }
}
export const getDepo =async (req:Request,res:Response,next: NextFunction) => {
    try {
        const id = req.params.id

        const depo = await Depo.findById(id)
        if(!depo) return res.send({data: null})
        res.send({data: depo})
    } catch (error) {
        next(error)
    }
}
export const getDepos =async (req:Request,res:Response,next: NextFunction) => {
    try {
        const depo = await Depo.find({})
        res.send({data: depo})
    } catch (error) {
        next(error)
    }
}
export const deleteDepo =async (req:Request,res:Response,next: NextFunction) => {
    try {
        const id = req.params.id

        const deleted = await Depo.deleteOne({_id: id})
        if(!deleted.deletedCount) return res.send({data: 'Operation unsuccesfull!'})
        res.send({data: 'Succesfully deleted'})
    } catch (error) {
        next(error)
    }
}