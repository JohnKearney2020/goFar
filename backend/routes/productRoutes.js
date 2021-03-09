import express from 'express';
const router = express.Router();
import { getProducts, getProductById } from '../controllers/productController.js';

// Root url: /api/products
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);


export default router;