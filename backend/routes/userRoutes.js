import express from 'express';
const router = express.Router();
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js';
import { getUserWishList, addUserWishListItem } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// Root url: /api/users
router.route('/').post(registerUser);
router.post('/login', authUser);
// Protected Routes
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/wishlistitem').post(protect, addUserWishListItem);

export default router;