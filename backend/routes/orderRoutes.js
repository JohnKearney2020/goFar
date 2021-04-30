import express from 'express';
const router = express.Router();
import { updateUserData, updateInventory } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// Root url: /api/users/orders

//=====================
//  Protected Routes
//=====================
router.route('/').put(protect, updateUserData);
router.route('/inventoryupdate').put(protect, updateInventory);


export default router; 