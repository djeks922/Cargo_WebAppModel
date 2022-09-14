
import { NextFunction, Request, Response } from "express"
export default async (err: any,req:Request,res:Response,next: NextFunction) => {
    try {
        console.log(err.message)
        let statusCode = err.status || 500
        let message = err.message || 'Internal error'
        res.status(statusCode).send({message})
    } catch (error) {
        throw error
    }
}