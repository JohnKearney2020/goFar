import express from 'express';
const router = express.Router();
// import { getUserOrders, createUserOrder } from '../controllers/orderController.js';
import { createUserOrder, updateInventory, orderCartUpdate } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// Root url: /api/users/orders

//=====================
//  Protected Routes
//=====================
// router.route('/').get(protect, getUserOrders).put(protect, createUserOrder);
router.route('/').post(protect, createUserOrder);
router.route('/cartupdate').put(protect, orderCartUpdate);
router.route('/inventoryupdate').put(protect, updateInventory);

// /api/users/orders/inventoryupdate


export default router; 