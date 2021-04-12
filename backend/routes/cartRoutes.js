import express from 'express';
const router = express.Router();

import { getCart, addCartItem, deleteCartItem, updateCartQty } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

// Root url: /api/users/cart
router.route('/cartitem').post(protect, addCartItem).put(protect, updateCartQty);
router.route('/cartitem/:userid&:productid&:color&:size&:sizecategory').delete(protect, deleteCartItem);
router.route('/').post(protect, getCart);


export default router;