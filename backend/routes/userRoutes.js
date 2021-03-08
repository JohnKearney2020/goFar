import express from 'express';
const router = express.Router();
import { authUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// Root url: /api/users
router.post('/login', authUser);
// Protected Routes
router.route('/profile').get(protect, getUserProfile);
export default router;