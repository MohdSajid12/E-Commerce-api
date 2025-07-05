import express, { Router } from 'express';
import { addProduct, deleteProductById, getAllProduct, getProductById, updateProductById } from '../Controllers/product.js'

const router = express.Router();

router.post("/add-product" , addProduct) ;
router.get("/get-all-product" , getAllProduct) ;
router.get("/get-productByID/:id" , getProductById) ;
router.post("/update-productByID/:id" , updateProductById) ;
router.post("/delete-product/:id" , deleteProductById) ;

export default router;