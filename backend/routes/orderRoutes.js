import express from 'express';
const router = express.Router();
import { createOrder, updateInventory } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// Root url: /api/orders

//=====================
//  Protected Routes
//=====================
router.route('/').post(protect, createOrder);
router.route('/inventoryupdate').put(protect, updateInventory);


export default router; 