import express from 'express'
import {createProduct,getProduct,getProducts,deleteProduct} from '../controller/product.controller'

const router = express.Router()


router.post('/', createProduct)
router.get('/:id', getProduct)
router.get('/', getProducts)
router.delete('/:id', deleteProduct)

export {router as ProductRouter} 