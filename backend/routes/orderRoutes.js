import express from 'express';
const router = express.Router();
// import { getUserOrders, updateUserOrders } from '../controllers/orderController.js';
import { updateUserOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// Root url: /api/users/orders

//=====================
//  Protected Routes
//=====================
// router.route('/').get(protect, getUserOrders).put(protect, updateUserOrders);
router.route('/').post(protect, updateUserOrders);

export default router;