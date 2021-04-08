import express from 'express';
const router = express.Router();
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js';
import { getUserWishListProducts, addUserWishListItem, deleteUserWishListItem } from '../controllers/userController.js';
import { getCart, addCartItem, deleteCartItem, updateCartQty } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// Root url: /api/users
router.route('/').post(registerUser);
router.post('/login', authUser);
// Protected Routes
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
// Wishlist
router.route('/wishlistitem/').post(protect, addUserWishListItem);
router.route('/wishlistitem/:userid&:productid&:color&:size&:sizecategory').delete(protect, deleteUserWishListItem);
router.route('/wishlist').post(protect, getUserWishListProducts);
// Cart
router.route('/cartitem/').post(protect, addCartItem).put(protect, updateCartQty);
router.route('/cartitem/:userid&:productid&:color&:size&:sizecategory').delete(protect, deleteCartItem);
router.route('/cart/').post(protect, getCart);


export default router;