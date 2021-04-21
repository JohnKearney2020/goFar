import express from 'express';
const router = express.Router();
import { getUserWishListProducts, addUserWishListItem, deleteUserWishListItem, updateWholeWishList } from '../controllers/wishListController.js';
import { protect } from '../middleware/authMiddleware.js';

// Root url: /api/users/wishlist
//=====================
//  Protected Routes
//=====================
// Wishlist
router.route('/wishlistitem').post(protect, addUserWishListItem);
router.route('/updatewholewishlist').put(protect, updateWholeWishList);
router.route('/wishlistitem/:userid&:productid&:color&:size&:sizecategory').delete(protect, deleteUserWishListItem);
router.route('/').post(protect, getUserWishListProducts); //We send an array of product ID with this POST request. It is a GET essentially

export default router;