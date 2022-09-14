
import {Express,Request ,  NextFunction, Response} from 'express'
import { FlightRouter } from './flights.routes'
import { ProductRouter } from './products.routes'
import { DepoRouter } from './depo.routes'
 

export default (app: Express) => {


    app.use('/flights',FlightRouter)
    app.use('/products',ProductRouter)
    app.use('/depos',DepoRouter)
}