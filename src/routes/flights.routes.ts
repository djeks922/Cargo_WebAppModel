import express from 'express'
import {createFlight,getFlight,getFlights,deleteFlight,addProductToFlight, unloadFlight} from '../controller/flight.controller'
import productExistsMiddleware from '../middleware/productExists.middleware'

const router = express.Router()


router.post('/unload/:flightID/:depoID', unloadFlight)
router.post('/add-product/:flightID/:productID', productExistsMiddleware,addProductToFlight)
router.post('/', createFlight)
router.get('/:id', getFlight)
router.get('/', getFlights)
router.delete('/:id', deleteFlight)

export {router as FlightRouter} 