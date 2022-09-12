import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import Depo, { categoryDepo } from "../model/depo.model"


export const createDepo =async (depo: any) => {
    try {
        const _depo = await Depo.create(depo)

        return _depo
    } catch (error) {
        throw error 
    }
}
export const getDepo =async ({id = undefined, category = undefined}:{id?: string | undefined, category?: categoryDepo | undefined}) => {
    try {
        const queryParam = id? {_id: id} : category ? {category} : null;
        if(!queryParam) throw new Error("Bad request");
        
         
        const depo = await Depo.findOne(queryParam)
       
        return depo
    } catch (error) {
        throw error
    }
}
export const getDepos =async (req:Request,res:Response,next: NextFunction) => {
    try {
        const depos = await Depo.find({})
        return depos
    } catch (error) {
        throw error
    }
}
export const deleteDepo =async (id: string) => {
    try {
        const deleted = await Depo.deleteOne({_id: id})
        if(!deleted.deletedCount) throw new Error('Operation unsuccesfull')
        return 'Succesfully deleted'
    } catch (error) {
       throw error
    }
}

export const addProduct =async (id: mongoose.Types.ObjectId, category: categoryDepo) => {
    try {
        const updated = await Depo.updateOne({category}, {$addToSet: {products: id}})
        console.log(updated)
        return updated
    } catch (error) {
       throw error
    }
}