import express from 'express'
import {createDepo,getDepo,getDepos,deleteDepo,addProductToDepo, removeProductFromDepo} from '../controller/depo.controller'
import productExistsMiddleware from '../middleware/productExists.middleware'

const router = express.Router()


router.post('/', createDepo)
router.post('/:depoID/:productID', productExistsMiddleware,addProductToDepo)
router.delete('/:depoID/:productID', productExistsMiddleware,removeProductFromDepo)
router.get('/', getDepos)
router.get('/:id', getDepo)
router.delete('/:id', deleteDepo)

export {router as DepoRouter} 