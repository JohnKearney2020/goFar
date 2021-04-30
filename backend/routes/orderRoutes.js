import express from 'express';
const router = express.Router();
// import { getUserOrders, createUserOrder } from '../controllers/orderController.js';
import { createUserOrder, updateInventory } from '../controllers/orderController.js';
import { updateWholeCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

// Root url: /api/users/orders

//=====================
//  Protected Routes
//=====================
// router.route('/').get(protect, getUserOrders).put(protect, createUserOrder);
router.route('/').post(protect, createUserOrder).put(protect, updateWholeCart);
router.route('/inventoryupdate').put(protect, updateInventory);

// /api/users/orders/inventoryupdate


export default router; 