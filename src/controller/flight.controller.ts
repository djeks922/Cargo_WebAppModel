import { NextFunction, Request, Response } from "express"
import flightModel from "../model/flight.model"


export const createFlight =async (req:Request,res:Response,next: NextFunction) => {
    try {
        const fligthInput = req.body
        fligthInput.flight_date = new Date(fligthInput.flight_date)
        fligthInput.landing_date = new Date(fligthInput.landing_date)

        const fligthDoc = await flightModel.create(fligthInput)
        res.send({data: fligthDoc})
    } catch (error) {
        next(error)
    }
}
export const getFlight =async (req:Request,res:Response,next: NextFunction) => {
    try {
        const id = req.params.id

        const flight = await flightModel.findById(id)
        if(!flight) return res.send({data: null})
        res.send({data: flight})
    } catch (error) {
        next(error)
    }
}
export const getFlights =async (req:Request,res:Response,next: NextFunction) => {
    try {
        const flights = await flightModel.find({})
        res.send({data: flights})
    } catch (error) {
        next(error)
    }
}
export const deleteFlight =async (req:Request,res:Response,next: NextFunction) => {
    try {
        const id = req.params.id

        const deleted = await flightModel.deleteOne({_id: id})
        if(!deleted.deletedCount) return res.send({data: 'Operation unsuccesfull!'})
        res.send({data: 'Succesfully deleted'})
    } catch (error) {
        
    }
}