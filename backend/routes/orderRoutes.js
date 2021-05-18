import express from 'express';
const router = express.Router();
import { createOrder, updateInventory, getUserOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// Root url: /api/orders

//=====================
//  Protected Routes
//=====================
router.route('/').post(protect, createOrder).get(protect, getUserOrders);
router.route('/inventoryupdate').put(protect, updateInventory);


export default router; 