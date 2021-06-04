import express from 'express';
const router = express.Router();
import { getReviewByProductId, createReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

// Root url: /api/reviews

//=====================
//  Protected Routes
//=====================
// router.route('/').post(protect, createOrder).get(protect, getUserOrders);
router.route('/').get(getReviewByProductId).post(protect, createReview);
// router.route('/inventoryupdate').put(protect, updateInventory);


export default router; 