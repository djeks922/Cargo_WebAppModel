import express from 'express'
import {createFlight,getFlight,getFlights,deleteFlight} from '../controller/flight.controller'

const router = express.Router()


router.post('/', createFlight)
router.get('/:id', getFlight)
router.get('/', getFlights)
router.delete('/:id', deleteFlight)

export {router as FlightRouter} 