import express from 'express';
import { addToCart ,clearCart,decreaseProductQty,getUserCart, removeProductFromCart } from '../Controllers/cart.js';
import { isAuthenciated } from '../Middlewares/Auth.js';

const router = express.Router();

router.post("/addToCart" ,isAuthenciated,addToCart);
router.get("/getUserCart" ,isAuthenciated,getUserCart);
router.post("/remove/:productId" ,isAuthenciated,removeProductFromCart);
router.post("/clearCart" ,isAuthenciated,clearCart);
router.post("/--qty" ,isAuthenciated,decreaseProductQty);


export default router;